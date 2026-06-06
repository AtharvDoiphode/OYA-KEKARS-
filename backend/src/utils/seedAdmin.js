import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.log("⚠️  ADMIN_EMAIL or ADMIN_PASSWORD not found in .env. Skipping admin seed.");
            return;
        }

        // Check if admin exists
        let admin = await Admin.findOne({ email: adminEmail });

        if (!admin) {
            // First time setup: Create admin
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            admin = await Admin.create({
                email: adminEmail,
                password: hashedPassword
            });
            console.log("✅ Admin account successfully seeded from .env credentials.");
        } else {
            // Optional: You could update the password here if it differs from .env, 
            // but usually it's better to only seed if it doesn't exist so they can use forgot-password.
            console.log("✅ Admin account already exists. Skipping seed.");
        }
    } catch (error) {
        console.error("❌ Error seeding admin:", error.message);
    }
};

export default seedAdmin;
