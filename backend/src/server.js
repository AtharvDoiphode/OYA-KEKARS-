import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import cakeRoutes from "./routes/cakeRoutes.js";

const app = express();

connectDB();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));


app.use("/api/auth", authRoutes);

app.use("/api/cakes", cakeRoutes);


app.get("/", (req, res) => {
    res.send("Oya Kekars API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});