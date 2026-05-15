import Puzzle from "../models/Puzzle.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const savePuzzleProgress = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const incomingPuzzleId = String(req.params.id).trim();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.puzzlesSolved) {
            user.puzzlesSolved = [];
        }

        const hasSolved = user.puzzlesSolved.some(
            (savedId) => String(savedId).trim() === incomingPuzzleId
        );

        if (hasSolved) {
            return res.status(200).json({ 
                message: "Puzzle already solved.",
                score: user.score || 0
            });
        }

        const puzzle = await Puzzle.findById(incomingPuzzleId);
        if (!puzzle) {
            return res.status(404).json({ message: "Puzzle not found." });
        }

        let pointsEarned = 10;
        if (puzzle.difficulty === "Medium") pointsEarned = 20;
        if (puzzle.difficulty === "Hard") pointsEarned = 30;

        user.score = (user.score || 0) + pointsEarned;
        user.puzzlesSolved.push(new mongoose.Types.ObjectId(incomingPuzzleId)); 
        
        await user.save();

        return res.status(200).json({ 
            message: `Correct! You earned ${pointsEarned} points.`, 
            score: user.score 
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getPuzzleByDifficulty = async (req, res) => {
    try {
        const puzzles = await Puzzle.aggregate([
            { $match: { difficulty: req.params.difficulty } },
            { $sample: { size: 1 } }
        ]);
        res.status(200).json(puzzles[0]);
    } catch (error) {
        console.error("Error fetching puzzle:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createPuzzle = async (req, res) => {
    try {
        const { difficulty, question, answer, hint } = req.body;
        const newPuzzle = new Puzzle({ difficulty, question, answer, hint });
        await newPuzzle.save();
        res.status(201).json(newPuzzle);

    } catch (error) {
        console.error("Error creating puzzle:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updatePuzzle = async (req, res) => {
    try {
        const {question, answer, hint} = req.body;
        const updatedPuzzle = await Puzzle.findByIdAndUpdate(
            req.params.id,
            {question, answer, hint},
            {new: true}
        );
        if (!updatedPuzzle) {
            return res.status(404).json({ message: "Puzzle not found" });
        }
        res.status(200).json(updatedPuzzle);

    } catch (error) {
        console.error("Error updating puzzle:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deletePuzzle = async (req, res) => {
    try {
        const deletedPuzzle = await Puzzle.findByIdAndDelete(req.params.id);
        if (!deletedPuzzle) {
            return res.status(404).json({ message: "Puzzle not found" });
        }
        res.status(200).json({ message: "Puzzle deleted successfully" });
    } catch (error) {
        console.error("Error deleting puzzle:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { getPuzzleByDifficulty, createPuzzle, updatePuzzle, deletePuzzle, savePuzzleProgress };