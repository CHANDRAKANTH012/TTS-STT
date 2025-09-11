import express from 'express';

import Transcript from '../models/transcript.js';

const router = express.Router();

// GET all history
router.get("/", async (req, res) => {
  try {
    const transcripts = await Transcript.find().sort({ createdAt: -1 });
    res.json(transcripts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
});

export default router;
