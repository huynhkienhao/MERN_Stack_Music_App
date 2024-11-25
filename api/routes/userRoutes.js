import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// Các route liên quan đến người dùng
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/profile/:id", userController.updateProfile);
router.get("/profile/:id", userController.getUserProfile);

export default router;
