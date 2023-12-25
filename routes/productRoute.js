import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//Create Products
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Get Products
router.get("/get-product", getProductController);

// Get Single Products
router.get("/get-product/:slug", getSingleProductController);

// Get Photo
router.get("/product-photo/:id", productPhotoController);

//Update Products
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Delete Product
router.delete("/delete-product/:pid", deleteProductController);

// Product Filter
router.post("/product-filters", productFiltersController);

// Product Count
router.get("/product-count", productCountController);

// Products Per Page
router.get("/product-list/:page", productListController);

export default router;
