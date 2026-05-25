import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import Admin from "../models/Admin.js";
import sendEmail from "../utils/sendEmail.js";


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

// REGISTER ADMIN (First time setup only)
export const registerAdmin = async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            return res.status(403).json({ message: "Admin account already exists. Registration locked." });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            message: "Admin created successfully",
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CHECK IF ADMIN EXISTS
export const checkAdminStatus = async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        res.status(200).json({
            hasAdmin: adminCount > 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            return res.status(404).json({ message: "There is no admin with that email" });
        }

        // Get reset token
        const resetToken = admin.getResetPasswordToken();

        await admin.save({ validateBeforeSave: false });

        // Create reset url (pointing to frontend)
        const resetUrl = `http://localhost:3000/admin/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
        const html = `
            <h1>You requested a password reset</h1>
            <p>Please go to this link to reset your password:</p>
            <a href="${resetUrl}" clicktracking="off">${resetUrl}</a>
        `;

        try {
            await sendEmail({
                email: admin.email,
                subject: "OYA Kekars Admin Password Reset",
                message,
                html
            });

            res.status(200).json({ message: "Email sent successfully" });
        } catch (error) {
            console.error(error);
            admin.resetPasswordToken = undefined;
            admin.resetPasswordExpire = undefined;

            await admin.save({ validateBeforeSave: false });

            return res.status(500).json({ message: "Email could not be sent" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const admin = await Admin.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!admin) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Set new password
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(req.body.password, salt);
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;

        await admin.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};