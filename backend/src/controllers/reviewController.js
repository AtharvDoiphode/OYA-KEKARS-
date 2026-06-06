import Review from "../models/Review.js";


// SUBMIT A REVIEW (PUBLIC)
export const submitReview = async (req, res) => {

    try {

        const { name, rating, text } = req.body;

        if (!name || !rating || !text) {
            return res.status(400).json({
                message: "Name, rating, and review text are required"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        const review = await Review.create({
            name,
            rating,
            text,
            approved: false
        });

        res.status(201).json({
            message: "Thank you! Your review will appear after approval.",
            review
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// GET ALL APPROVED REVIEWS (PUBLIC)
export const getApprovedReviews = async (req, res) => {

    try {

        const reviews = await Review.find({ approved: true })
            .sort({ createdAt: -1 });

        const formattedReviews = reviews.map((review, index) => ({
            id: review._id,
            name: review.name,
            rating: review.rating,
            text: review.text,
            date: formatRelativeDate(review.createdAt)
        }));

        res.status(200).json({
            success: true,
            reviews: formattedReviews
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// GET ALL REVIEWS INCLUDING PENDING (ADMIN)
export const getAllReviews = async (req, res) => {

    try {

        // Pending reviews first, then by date (newest first)
        const reviews = await Review.find()
            .sort({ approved: 1, createdAt: -1 });

        res.status(200).json(reviews);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// APPROVE A REVIEW (ADMIN)
export const approveReview = async (req, res) => {

    try {

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.status(200).json({
            message: "Review Approved",
            review
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE A REVIEW (ADMIN)
export const deleteReview = async (req, res) => {

    try {

        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.status(200).json({
            message: "Review Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// HELPER: Format date to relative string
function formatRelativeDate(date) {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
    if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
}
