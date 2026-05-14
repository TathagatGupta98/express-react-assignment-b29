import express from "express";
import { getPuzzleByLevel, createPuzzle, updatePuzzle, deletePuzzle } from "../controllers/puzzleControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(protect);

router.get("/:level", getPuzzleByLevel);
router.post("/", createPuzzle);
router.put("/:id", updatePuzzle);
router.delete("/:id", deletePuzzle);

export default router;