import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";


// LOGIN ADMIN
export const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        // CHECK ADMIN
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // CREATE TOKEN
        const token = jwt.sign(
            {
                id: admin._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};