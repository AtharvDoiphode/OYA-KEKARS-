import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    submitReview,
    getApprovedReviews,
    getAllReviews,
    approveReview,
    deleteReview
} from "../controllers/reviewController.js";

const router = express.Router();


// PUBLIC ROUTES
router.post("/", submitReview);
router.get("/", getApprovedReviews);


// PROTECTED ROUTES (ADMIN)
router.get("/all", protect, getAllReviews);
router.patch("/:id/approve", protect, approveReview);
router.delete("/:id", protect, deleteReview);

export default router;
