import mongoose from "mongoose";

const puzzleSchema = new mongoose.Schema(
    {
        level: {
            type: Number,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        hint: {
            type: String,
            required: true,
            min: 1,
            max: 10
        }
    }
);

const Puzzle = mongoose.model("Puzzle", puzzleSchema);

export default Puzzle;