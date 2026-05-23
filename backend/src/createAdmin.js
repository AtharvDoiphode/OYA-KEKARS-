import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();

connectDB();

const createAdmin = async () => {

    try {

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = await Admin.create({
            email: "admin@oyakekars.com",
            password: hashedPassword
        });

        console.log("Admin Created");
        console.log(admin);

        mongoose.connection.close();

    } catch (error) {

        console.log(error);
    }
};

createAdmin();