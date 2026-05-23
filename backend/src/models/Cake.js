import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    weight: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        type: String
    },

    available: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

const Cake = mongoose.model("Cake", cakeSchema);

export default Cake;