import express from "express";
import { getPuzzleByDifficulty, createPuzzle, updatePuzzle, deletePuzzle, savePuzzleProgress } from "../controllers/puzzleControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(protect);

router.get("/:difficulty", getPuzzleByDifficulty);
router.post("/", createPuzzle);
router.put("/:id", updatePuzzle);
router.delete("/:id", deletePuzzle);
router.post("/:id/solve", savePuzzleProgress);

export default router;