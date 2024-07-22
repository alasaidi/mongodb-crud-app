import express from "express";
import userController from "../controllers/users.controller.js";
const router = express.Router();

router.post("/api", userController.Register);
router.post("/api/login", userController.login);

export default router;
