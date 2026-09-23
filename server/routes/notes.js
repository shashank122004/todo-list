import { Router } from "express";
import Note from "../models/Note.js";

const router = Router();

router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ pinned: -1, createdAt: -1 });
  res.json(notes);
});

router.post("/", async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
});

router.put("/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;