const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Tweet = require("../models/tweet");
const Retweet = require("../models/retweet");

// get all retweet records
router.get("/", async (req, res) => {
  try {
    const retweets = await Retweet.find();
    res.status(200).json(retweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all retweets for a specific tweet
router.get("/tweet/:tweetID", async (req, res) => {
  try {
    const retweets = await Retweet.find({ item: req.params.tweetID });
    res.status(200).json(retweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all retweets for a specific tweet without quote
router.get("/tweetNoQuote/:tweetID", async (req, res) => {
  try {
    const retweets = await Retweet.find({ item: req.params.tweetID, quote: null });
    res.status(200).json(retweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// search for a specific retweet by username and tweetID
router.get('/search/:username/:tweetID', async (req, res) => {
  try {
    const retweet = await Retweet.findOne({ item: req.params.tweetID, username: req.params.username });
    res.status(200).json(retweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all retweets for a specific user
router.get('/user/:username', async (req, res) => {
  try {
    const retweets = await Retweet.find({ username: req.params.username });
    res.status(200).json(retweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// post a retweet
router.post('/', async (req, res) => {
  const { username, tweetID, quote } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "This user does not exist in our database" });
    }
    const tweet = await Tweet.findById(tweetID);
    if (!tweet) {
      return res.status(400).json({ message: "This tweet does not exist in our database" });
    }
    const retweet = new Retweet({
      username,
      item: tweet._id,
      quote
    });
    await retweet.save();
    // Update retweet count in the tweet schema
    tweet.retweets.push(retweet);
    await tweet.save();
    res.status(201).json(retweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete a retweet by ID
router.delete("/:id", async (req, res) => {
  try {
    const retweet = await Retweet.findById(req.params.id);
    if (!retweet) {
      return res.status(400).json({ message: "Retweet under this ID doesn't exist" });
    }
    // Update retweet count in the tweet schema
    await Tweet.updateOne({ _id: retweet.item }, { $pull: { retweets: req.params.id } });
    await retweet.remove();
    res.status(200).json({ message: "Record Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id/:username", async (req, res) => {
  try {
    const retweet = await Retweet.findOneAndDelete({ item: req.params.id, username: req.params.username, quote: { $exists: false } });
    if (!retweet) {
      return res.status(400).json({ message: "Retweet under this ID and username doesn't exist or has a quote" });
    }

    // Delete the retweet document
    await Retweet.deleteOne({ _id: retweet._id });

    // Update retweets array in the tweet schema
    const tweetUpdate = await Tweet.updateOne(
      { _id: retweet.item },
      { $pull: { retweets: { username: req.params.username, quote: null } } }
    );

    if (tweetUpdate.nModified === 0) {
      return res.status(400).json({ message: "Retweet was not properly removed from the tweet object" });
    }
    
    res.status(200).json({ message: "Record Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

