import mongoose from "mongoose";

// Define the Puzzle schema
// Make a model from the schema and export it

const puzzleSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Puzzle = mongoose.model("Puzzle", puzzleSchema);

export default Puzzle;