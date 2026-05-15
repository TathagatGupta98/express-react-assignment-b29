import express from "express";
import puzzleRoutes from "./routes/puzzleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

app.use(cors({
    origin: "http://localhost:5173", // Allow your React app
    credentials: true // Allow cookies/tokens to be sent
}));

//middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/puzzles", puzzleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

