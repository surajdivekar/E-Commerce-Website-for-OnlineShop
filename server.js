import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";

import cors from "cors";

//Configure env
dotenv.config();

//Database Config
connectDB();

// rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//Rest API
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to E-Commerce App",
  });
});

//Port
const PORT = process.env.PORT || 8080;

//Run Listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.....`);
});
