const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  try {
    res.send("Hello World!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  // add a console.log statement here to confirm that the server has started
  console.log("Express server started successfully");
});
