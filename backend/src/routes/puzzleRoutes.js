import express from "express";
import { getPuzzle, getPuzzleAnswer } from "../controllers/puzzleControllers.js";
const router = express.Router();

router.get("/", getPuzzle);
router.get("/:id", getPuzzleAnswer);


export default router;