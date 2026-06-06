import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import seedAdmin from "./utils/seedAdmin.js";

import authRoutes from "./routes/authRoutes.js";
import cakeRoutes from "./routes/cakeRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

connectDB().then(() => {
    seedAdmin();
});

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", process.env.FRONTEND_URL, "https://oya-kekars.vercel.app"],
    credentials: true
}));


app.use("/api/auth", authRoutes);

app.use("/api/cakes", cakeRoutes);

app.use("/api/reviews", reviewRoutes);


app.get("/", (req, res) => {
    res.send("Oya Kekars API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Self-ping to keep Render free tier awake (every 14 minutes)
    const backendUrl = "https://oya-kekars.onrender.com";
    setInterval(() => {
        fetch(backendUrl)
            .then(() => console.log("Self-ping successful"))
            .catch(err => console.log("Self-ping failed:", err.message));
    }, 14 * 60 * 1000);
});