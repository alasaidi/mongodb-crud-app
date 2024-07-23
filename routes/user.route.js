import express from "express";
import userController from "../controllers/users.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/api", verifyToken, userController.Register);
router.post("/api/login", userController.login);
router.get("/api/logout", userController.logout);

export default router;
