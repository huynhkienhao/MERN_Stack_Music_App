import express from "express";
import {
    register,
    login,
    logOut,
    getAdminProfile,
    getAllUsers,
    setAvatar,
} from "../controllers/AdminController.js";

const router = express.Router();

// Định nghĩa các route liên quan đến admin
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.get("/getAdminProfile", getAdminProfile);

router.get("/users", getAllUsers);
router.put("/users/:id/avatar", setAvatar);


export default router;
