import express from "express";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import {
    getCakes,
    addCake,
    updateCake,
    deleteCake
} from "../controllers/cakeController.js";

const router = express.Router();


// PUBLIC ROUTE
router.get("/", getCakes);


// PROTECTED ROUTES
router.post(
    "/",
    protect,
    upload.single("image"),
    addCake
);

router.put(
    "/:id",
    protect,
    upload.single("image"),
    updateCake
);

router.delete(
    "/:id",
    protect,
    deleteCake
);

export default router;