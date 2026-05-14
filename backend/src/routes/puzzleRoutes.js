import express from "express";
import { getPuzzle, getPuzzleAnswer, createPuzzle, updatePuzzle, deletePuzzle } from "../controllers/puzzleControllers.js";
const router = express.Router();

router.get("/", getPuzzle);
router.get("/:id", getPuzzleAnswer);
router.post("/", createPuzzle);
router.put("/:id", updatePuzzle);
router.delete("/:id", deletePuzzle);


export default router;