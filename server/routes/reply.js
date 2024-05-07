const express = require("express");
const router = express.Router();
const Reply = require("../models/reply");
const { ObjectId } = require('mongodb');

// get all replies
router.get("/", async (req, res) => {
  try {
    const replies = await Reply.find();
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get replies for a specific tweet
router.get("/:tweetId", async (req, res) => {
  const tweetId = req.params.tweetId;
  try {
    const replies = await Reply.find({ tweet: tweetId });
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// post a reply to a tweet
router.post("/:tweetId", async (req, res) => {
  const tweetId = req.params.tweetId;
  const { username, content } = req.body;
  const reply = new Reply({
    username,
    content,
    tweet: tweetId,
  });

  try {
    await reply.save();
    res.status(201).json({ message: "Reply added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete reply
router.delete("/:id", async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    await reply.remove();
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
