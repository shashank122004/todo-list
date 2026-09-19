import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI?.trim();

if (!mongoUri) {
  console.error("MONGO_URI is required. Add your online MongoDB connection string to server/.env.");
  process.exitCode = 1;
} else {
  mongoose
    .connect(mongoUri)
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("Mongo connection error:", err);
      process.exitCode = 1;
    });
}