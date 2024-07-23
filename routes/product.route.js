import express from "express";
import productController from "../controllers/product.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/api", verifyToken, productController.postProducts);
router.delete("/api", verifyToken, productController.deleteProducts);
router.put("/api/product/:id", verifyToken, productController.updateProducts);
router.put("/api/:id", verifyToken, productController.updateNameById);
router.get("/api/", productController.selectAllProducts);
router.get("/api/:id", productController.selectProductById);

export default router;
