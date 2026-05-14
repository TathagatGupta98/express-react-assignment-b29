import express from "express";
import puzzleRoutes from "./routes/puzzleRoutes.js";

const app = express();

app.use("/api/puzzles", puzzleRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});