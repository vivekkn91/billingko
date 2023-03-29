const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
async function startExpressServer() {
  // Connect to MySQL
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "v-kart",
  });
  console.log("Connected to MySQL");

  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(express.json());
  // Remove bodyParser middleware
  // expressApp.use(bodyParser.json());
  // expressApp.use(bodyParser.urlencoded({ extended: true }));

  // Use multer middleware for handling form-data format data
  const upload = multer({ dest: "uploads/" }); // specify the folder to save uploaded files

  // const jwt = require("jsonwebtoken");
  // const bcrypt = require("bcryptjs");

  expressApp.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
      // Get the user's name, email, and password from the request body
      const { fullName, email, password } = req.body;

      // Check if the user is already registered
      const [rows] = await connection.execute(
        "SELECT * FROM billusers WHERE email = ?",
        [email]
      );

      if (rows.length > 0) {
        // User is already registered, send a response with error message
        res.status(400).json({ message: "User already registered" });
      } else {
        // Hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate a JWT token for the newly registered user
        const token = jwt.sign(
          { email },
          "931eb5ee702b36b0b6711b2d6b022c5f3892788d4c29372e835d8b6a3fa84bf5efbba2d4fa4e0bb9bb1de33570a84ceba012d35453447292c1efd01baec531f7"
        );

        // Insert the user's information and token into the 'users' table
        const [result] = await connection.execute(
          "INSERT INTO billusers (name, email, password, token) VALUES (?, ?, ?, ?)",
          [fullName, email, hashedPassword, token]
        );

        // Send a response indicating success, including the JWT token
        res
          .status(201)
          .json({ message: "User registered successfully", token });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error registering user");
    }
  });

  expressApp.post("/api/login", async (req, res) => {
    console.log(req.body);
    try {
      // Get the user's email and password from the request body
      const { email, password } = req.body;

      // Check if the user is registered
      const [rows] = await connection.execute(
        "SELECT * FROM billusers WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        // User is not registered, send a response with error message
        res.status(400).json({ message: "User not found" });
      } else {
        // Compare the password with the hashed password
        const match = await bcrypt.compare(password, rows[0].password);

        if (!match) {
          // Password does not match, send a response with error message
          res.status(400).json({ message: "Invalid password" });
        } else {
          // Password matches, generate a new JWT token for the user
          const token = jwt.sign(
            { email },
            "931eb5ee702b36b0b6711b2d6b022c5f3892788d4c29372e835d8b6a3fa84bf5efbba2d4fa4e0bb9bb1de33570a84ceba012d35453447292c1efd01baec531f7"
          );

          // Update the user's token in the 'users' table
          const [result] = await connection.execute(
            "UPDATE billusers SET token = ? WHERE email = ?",
            [token, email]
          );

          // Send a response indicating success, including the JWT token
          res.status(200).json({ message: "Login successful", token });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error logging in");
    }
  });

  expressApp.get("/api/user", async (req, res) => {
    try {
      // Get the user's email from the JWT token
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(
        token,
        "931eb5ee702b36b0b6711b2d6b022c5f3892788d4c29372e835d8b6a3fa84bf5efbba2d4fa4e0bb9bb1de33570a84ceba012d35453447292c1efd01baec531f7"
      );
      const email = decodedToken.email;

      // Get the user's information from the 'users' table
      const [rows] = await connection.execute(
        "SELECT name, email FROM billusers WHERE email = ?",
        [email]
      );

      // Send a response with the user's information
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error getting user details");
    }
  });

  expressApp.get("/inventories", async (req, res) => {
    try {
      const [rows, fields] = await connection.execute(
        "SELECT * FROM inventories"
      );
      const products = rows.map((row) => ({
        id: row.id,
        item: row.item,
        category: row.category,
        price: row.price,
        description: row.description,
        user_id: row.user_id,
        imageUrl: `../../../images/${row.image}`,
      }));
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving products from database");
    }
  });
  expressApp.get("/categories/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const [rows, fields] = await connection.execute(
        "SELECT * FROM inventories WHERE category = ?",
        [category]
      );
      const products = rows.map((row) => ({
        id: row.id,
        item: row.item,
        category: row.category,
        price: row.price,
        description: row.description,
        user_id: row.user_id,
        imageUrl: `../../../images/${row.image}`,
      }));
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving products from database");
    }
  });
  expressApp.get("/inventories/categories", async (req, res) => {
    try {
      const [rows, fields] = await connection.execute(
        "SELECT DISTINCT category FROM inventories"
      );
      const categories = rows.map((row) => row.category);
      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving categories from database");
    }
  });

  expressApp.patch("/updateinventories/:id", async (req, res) => {
    const id = req.params.id;
    console.log("Updating inventory item with ID:", id);
    console.log(req.body);

    const { item, category, price, description } = req.body;
    if (!item && !category && !price && !description) {
      return res.status(400).json({ error: "At least one field is required" });
    }

    let sql = "UPDATE inventories SET";
    const values = [];

    if (item) {
      sql += " item = ?,";
      values.push(item);
    }

    if (category) {
      sql += " category = ?,";
      values.push(category);
    }

    if (price) {
      sql += " price = ?,";
      values.push(price);
    }

    if (description) {
      sql += " description = ?,";
      values.push(description);
    }

    // Remove trailing comma
    sql = sql.slice(0, -1);

    sql += " WHERE user_id = ?";
    values.push(id);

    try {
      const [results, fields] = await connection.execute(sql, values);
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json({ message: "Inventory item updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating inventory item");
    }
  });

  expressApp.delete("/deleteinventory/:id", async (req, res) => {
    const id = req.params.id;
    console.log("Deleting inventory item with ID:", id);

    try {
      const [results, fields] = await connection.execute(
        "DELETE FROM inventories WHERE user_id = ?",
        [id]
      );
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json({ message: "Inventory item deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting inventory item");
    }
  });
  expressApp.post("/billreport", async (req, res) => {
    const { billTotal, date, time } = req.body;
    console.log("Saving bill report:", req.body);

    try {
      const [createResult] = await connection.execute(
        "INSERT INTO bill_reports (bill_total, date, time) VALUES (?, ?, ?)",
        [billTotal, date, time]
      );
      console.log("Created bill report:", createResult);

      res.json({ message: "Bill report saved successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving bill report");
    }
  });
  expressApp.get("/billreport/today", async (req, res) => {
    try {
      // Get the total number of bills created today
      const [billCountResults] = await connection.execute(
        "SELECT COUNT(*) as bill_count FROM bill_reports WHERE date = CURDATE()"
      );
      const billCount = billCountResults[0].bill_count;

      // Get the total amount collected today
      const [totalAmountResults] = await connection.execute(
        "SELECT SUM(bill_total) as total_amount FROM bill_reports WHERE date = CURDATE()"
      );
      const totalAmount = totalAmountResults[0].total_amount;

      res.json({ billCount, totalAmount });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving bill report data");
    }
  });
  expressApp.get("/foodtype/types", async (req, res) => {
    try {
      const [rows, fields] = await connection.execute(
        "SELECT DISTINCT typeoffood FROM foodtype"
      );
      const types = rows.map((row) => row.typeoffood);
      res.json(types);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving types of food from database");
    }
  });

  expressApp.post("/addfoodtype/types", async (req, res) => {
    const { name } = req.body;
    console.log(name);
    try {
      // Check if category exists
      const [rows, fields] = await connection.execute(
        "SELECT * FROM foodtype WHERE typeoffood = ?",
        [name]
      );

      if (rows.length > 0) {
        return res.status(400).json({ message: "Category already exists" });
      }

      // Add new category
      await connection.execute("INSERT INTO foodtype (typeoffood) VALUES (?)", [
        name,
      ]);

      // Return success response
      res.json({ message: "Category added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding category to database");
    }
  });

  //  try {
  //    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
  //      new: true,
  //    });
  //    res.json(updatedProduct);
  //  } catch (err) {
  //    console.error(err);
  //    res.status(500).json({ error: "Failed to update product" });
  //  }

  // Use multer middleware for handling form-data format data
  // const upload = multer({ dest: "uploads/" }); // specify the folder to save uploaded files

  expressApp.post("/products", upload.single("image"), async (req, res) => {
    const { name, category, price, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name field is missing" });
    }

    if (!category) {
      return res.status(400).json({ error: "Category field is missing" });
    }

    if (!price) {
      return res.status(400).json({ error: "Price field is missing" });
    }

    if (!description) {
      return res.status(400).json({ error: "Description field is missing" });
    }

    // extract the filename from the uploaded file
    const filename = req.file.originalname;
    if (!filename) {
      return res.status(400).json({ error: "filename field is missing" });
    }

    // create a folder for images if it doesn't already exist
    const imagesDir = "./images";
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // move the uploaded file to the images folder
    const targetPath = path.join(imagesDir, filename);
    fs.rename(req.file.path, targetPath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving image file");
      }

      // save the product to the database
      const sql =
        "INSERT INTO inventories (item, category, price, description, image) VALUES (?, ?, ?, ?, ?)";
      const values = [name, category, price, description, filename];

      try {
        const [results, fields] = await connection.execute(sql, values);
        res.json({
          id: results.insertId,
          name: name,
          description: description,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send("Error saving product to database");
      }
    });
  });

  return expressApp;
}

module.exports = { startExpressServer };
