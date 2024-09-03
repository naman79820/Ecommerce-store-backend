const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./src/routes/user.route");
const categoryRoutes = require("./src/routes/category.route");
const productRoutes = require("./src/routes/product.route");
const reviewRoutes = require("./src/routes/review.route");
const cartRoutes = require("./src/routes/cart.route");
const cloudinary = require("cloudinary");

const env = require("dotenv");
const mongoose = require("mongoose");
env.config();
app.use(express.json());
app.use(cors());

app.use("/healthcheck", (req, res) => {
  res.send("ok");
});

// Database connection
mongoose
  .connect("mongodb://localhost:27017/Ecommerce-store")

  .then(() => console.log("Database Connected!"))
  .catch((error) => console.log("Database connection error:", error));

// Middleware
cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.CLOUD_KEY}`,
  api_secret: `${process.env.CLOUD_SECRET}`,
});

// Routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", reviewRoutes);
app.use("/api", cartRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
