import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/api", productController.postProducts);
router.delete("/api", productController.deleteProducts);
router.put("/api/product/:id", productController.updateProducts);
router.put("/api/:id", productController.updateNameById);
router.get("/api/", productController.selectAllProducts);
router.get("/api/:id", productController.selectProductById);

export default router;
