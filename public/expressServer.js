const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

  // Set up routes
  // expressApp.get("/inventories", async (req, res) => {
  //   try {
  //     const [rows, fields] = await connection.execute(
  //       "SELECT * FROM inventories"
  //     );
  //     res.json(rows);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Error fetching inventories");
  //   }
  // });

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
