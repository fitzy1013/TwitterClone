const express = require("express");
const router = express.Router();
const Reply = require("../models/reply");
const Tweet = require("../models/tweet");
const Retweet = require("../models/retweet");
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
  if (!ObjectId.isValid(tweetId)) {
    return res.status(400).json({ message: "Invalid tweet ID" });
  }
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
  if (!username || !content) {
    return res.status(400).json({ message: "Username and content are required" });
  }
  try {
    // Create the reply
    const reply = new Reply({
      username,
      content,
      tweet: tweetId,
    });
    // Save the reply
    await reply.save();

    // Find the parent tweet
    const parentTweet = await Tweet.findById(tweetId);
    if (parentTweet) {
      // Update the parent tweet's reply count
      parentTweet.replies.push(reply._id);
      await parentTweet.save();
      return res.status(201).json({ message: "Reply added successfully" });
    }

    // If parent tweet is not found, find the parent retweet
    const parentRetweet = await Retweet.findById(tweetId);
    if (parentRetweet) {
      // Update the parent retweet's reply count
      parentRetweet.replies.push(reply._id);
      await parentRetweet.save();
      return res.status(201).json({ message: "Reply added successfully" });
    }

    // If neither parent tweet nor parent retweet is found, return an error
    return res.status(404).json({ message: "Parent tweet or retweet not found" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete reply
router.delete("/:id", async (req, res) => {
  const replyId = req.params.id;
  if (!ObjectId.isValid(replyId)) {
    return res.status(400).json({ message: "Invalid reply ID" });
  }
  try {
    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    // Find the parent tweet or retweet
    let parent;
    if (reply.tweet) {
      parent = await Tweet.findById(reply.tweet);
    } else {
      parent = await Retweet.findById(reply.retweet);
    }

    if (parent) {
      // Remove the reply ID from the parent's replies array
      parent.replies = parent.replies.filter(id => id.toString() !== replyId);
      await parent.save();
    }

    await reply.remove();
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
