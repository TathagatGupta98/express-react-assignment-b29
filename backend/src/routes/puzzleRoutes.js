import express from "express";
import { getPuzzleByLevel, createPuzzle, updatePuzzle, deletePuzzle } from "../controllers/puzzleControllers.js";
const router = express.Router();

router.get("/:level", getPuzzleByLevel);
router.post("/", createPuzzle);
router.put("/:id", updatePuzzle);
router.delete("/:id", deletePuzzle);


export default router;