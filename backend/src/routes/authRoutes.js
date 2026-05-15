import express from "express";
import { registerUser, loginUser, getLeaderboard } from "../controllers/authControllers.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/leaderboard", getLeaderboard);

export default router;