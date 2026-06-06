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
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        const resetUrl = `${frontendUrl}/admin/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 12px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #dc2626; margin: 0; font-size: 28px;">OYA Kekars</h1>
                    <p style="color: #666; margin-top: 5px; font-size: 14px;">Admin Security</p>
                </div>
                <div style="background-color: #fcf0f0; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <p style="font-size: 16px; color: #333; margin-top: 0;">Hello Admin,</p>
                    <p style="font-size: 16px; color: #333; line-height: 1.5;">You recently requested to reset the password for your OYA Kekars admin account. Click the button below to proceed. This link is valid for 10 minutes.</p>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);">Reset My Password</a>
                </div>
                <p style="font-size: 14px; color: #666; text-align: center; margin-bottom: 30px;">
                    Or copy and paste this link into your browser:<br>
                    <a href="${resetUrl}" style="color: #dc2626; word-break: break-all; font-size: 13px;">${resetUrl}</a>
                </p>
                <p style="font-size: 13px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                    If you did not request a password reset, please ignore this email. Your password will remain unchanged.
                </p>
                <div style="text-align: center; margin-top: 20px;">
                    <p style="font-size: 12px; color: #aaa; margin: 0;">&copy; ${new Date().getFullYear()} OYA Kekars. All rights reserved.</p>
                </div>
            </div>
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