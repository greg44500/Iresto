import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProductById,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, createProduct);
router
  .route("/:id")
  .get(getSingleProductById)
  .put(updateProduct)
  .delete(deleteProduct);
export default router;
