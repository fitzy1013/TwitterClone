const express = require("express");
const router = express.Router();
const Tweet = require("../models/tweet");
const User = require("../models/user");
const Retweet = require("../models/retweet");
const Reply = require("../models/tweet");
const { ObjectId } = require('mongodb');

/* Required Functions
Get all tweets
Get tweets by userID
Post a new tweet
Delete a tweet
Get all replies
get replies for a specific tweet
Post reply to a tweet
*/

// get all tweets
router.get("/", async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.status(200).json(tweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all replies
router.get("/replies", async (req, res) => {
  try {
    const replies = await Reply.find();
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get replies for a specific tweet
router.get("/:tweetId/replies", async (req, res) => {
  const tweetId = req.params.tweetId;
  try {
    const replies = await Reply.find({ tweet: tweetId });
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// post a reply to a tweet
router.post("/:tweetId/replies", async (req, res) => {
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

// post a tweet
router.post("/", async (req, res) => {
  const tweet = new Tweet({
    username: req.body.username,
    content: req.body.content,
  });

  try {
    const results = await User.find({ username: tweet.username });
    if (results.length < 1) {
      return res
        .status(400)
        .json({ message: "This username doesn't exist in this database" });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  try {
    await tweet.save();
    res.status(201).json({ message: "Tweet added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete tweet
router.delete("/:id", async (req, res) => {
  console.log("trying to delete");
  const searchId = new ObjectId(req.params.id);
  let tweet;
  try {
    tweet = await Tweet.findById(req.params.id);
    if (tweet == null) {
      return res
        .status(400)
        .json({ message: "Tweet under this ID doesn't exist" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  try {
    await Tweet.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  // Handling replies deletion
  try {
    await Reply.deleteMany({ tweet: searchId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.status(200).json({ message: "Tweet and its replies deleted successfully" });
});

module.exports = router;

