import express from "express";

import { loginAdmin, registerAdmin, checkAdminStatus, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.get("/status", checkAdminStatus);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

export default router;