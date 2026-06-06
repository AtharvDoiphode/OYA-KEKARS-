import express from "express";

import { loginAdmin, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

export default router;