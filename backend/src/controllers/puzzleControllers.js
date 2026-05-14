import Puzzle from "../models/Puzzle.js";

const getPuzzleByLevel = async (req, res) => {
    try {
        const puzzle = await Puzzle.find({ level: req.params.level });
        res.status(200).json(puzzle);
    } catch (error) {
        console.error("Error fetching puzzle:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createPuzzle = async (req, res) => {
    try {
        const { level, question, answer, hint } = req.body;
        const newPuzzle = new Puzzle({ level, question, answer, hint });
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

export { getPuzzleByLevel, createPuzzle, updatePuzzle, deletePuzzle };