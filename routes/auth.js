import express from "express";
import { register, login, logout } from "../controlles/auth.js";
import { verifyToken } from "../utils/verifyTest.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.put("/wyloguj",verifyToken, logout)

export default router