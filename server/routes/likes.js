const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Like = require("../models/likes");
const Tweet = require("../models/tweet");
const Retweet = require("../models/retweet");

// get all likes records
router.get("/", async (req, res) => {
  try {
    const likes = await Like.find();
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all likes for a specific tweet or retweet
router.get('/item/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const likes = await Like.find({ item: itemId });
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get likes for a specific user and tweet or retweet
router.get('/search/:username/:itemId', async (req, res) => {
  const { username, itemId } = req.params;
  try {
    const like = await Like.findOne({ item: itemId, username });
    res.status(200).json(like);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all tweets or retweets liked by a specific user
router.get('/user/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const likes = await Like.find({ username });
    const itemIds = likes.map(like => like.item);
    const tweets = await Tweet.find({ _id: { $in: itemIds } });
    const retweets = await Retweet.find({ _id: { $in: itemIds } });
    res.status(200).json({ tweets, retweets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// post a like
router.post('/', async (req, res) => {
  const { username, itemId } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "This user does not exist in our database" });
    }

    // Check if the item is a tweet or a retweet
    let item;
    const tweet = await Tweet.findById(itemId);
    console.log
    if (tweet) {
      item = tweet;
    } else {
      const retweet = await Retweet.findById(itemId);
      if (retweet) {
        item = retweet;
      } else {
        return res.status(400).json({ message: "This item does not exist in our database" });
      }
    }

    // Create and save the like
    const like = new Like({ username, item: itemId });
    await like.save();

    // Update likes in tweet or retweet schema
    item.likes.push(like);
    await item.save();

    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete a like
router.delete("/:id/:username", async (req, res) => {
    const { id, username } = req.params;
    console.log(id);
    console.log(username);
    try {
      // Find and delete the like
      const like = await Like.findOneAndDelete({ item: id, username });
      if (!like) {
        return res.status(400).json({ message: "Like under this ID doesn't exist" });
      }
  
      // Update likes in tweet or retweet schema
      let item;
      item = await Tweet.findById(id);
      if (!item) {
        item = await Retweet.findById(id);
      }
      if (item) {
        // Remove the deleted like from the likes array
        item.likes = item.likes.filter(likeObj => likeObj._id.toString() !== like._id.toString());
        await item.save();
        return res.status(200).json({ message: "Record Deleted Successfully" });
      } else {
        return res.status(400).json({ message: "Tweet or Retweet under this ID doesn't exist" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;

