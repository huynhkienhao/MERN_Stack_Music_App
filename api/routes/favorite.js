import express from "express";
import {
    getFavourites,
    createFavourites,
    deleteFavorites,
} from "../controllers/FavoriteController.js";

const router = express.Router();

router.get("/favorites", getFavourites);
router.post("/create-favorites", createFavourites);
router.delete("/deletefavourites/:id", deleteFavorites);

export default router;
