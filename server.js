require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4521;

// Set up database connection
require("./config/dbConnection");

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/", require("./routes/admin.route"));
app.use("/", require("./routes/projectManager.route"));

// Error handling middleware - Move it to the end
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.APP_URI || "http://localhost"}:${PORT}`);
});
