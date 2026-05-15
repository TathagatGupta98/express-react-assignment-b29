import Puzzle from "../models/Puzzle.js";

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

export { getPuzzleByDifficulty, createPuzzle, updatePuzzle, deletePuzzle };