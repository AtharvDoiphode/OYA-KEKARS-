import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    text: {
        type: String,
        required: true,
        trim: true
    },

    approved: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
