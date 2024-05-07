const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Follow = require("../models/follow");

/*
Fucntional Requirements 
For a username return users both following and followed by along with counts 
Add a follow record which includes the username of the person following and the followed
Search for a whether a specifc user is followed by another vice versa
*/

// get all follows information
router.get("/", async (req, res) => {
  try {
    const follows = await Follow.find();
    res.status(201).json(follows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// get all information for specific user
router.get("/:username", getFollowers, getFollowing, (req, res) => {
    res.status(201).json({followers: res.followers, following: res.following})
});

// check for a follow combination
router.get('/:follower/:followed', async (req, res) => {
    try {
        const follow = await Follow.find({follower: req.params.follower, followed: req.params.followed})
        if (follow.length < 1) {
            res.status(201).json({followStatus: false})
        } else {
            res.status(201).json({followStatus: true})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

// post new follow recrod
router.post("/", async (req, res) => {
  console.log("Follow post")
  try {
    const followerUser = await User.find({ username: req.body.follower });
    if (followerUser.length < 1) {
      return res
        .status(400)
        .json({ message: "The follower user doesn't exist in the database" });
    }
    const followedUser = await User.find({ username: req.body.followed });
    if (followedUser.length < 1) {
      return res
        .status(400)
        .json({ message: "The followed user doesn't exist in the database" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  const follow = new Follow({
    follower: req.body.follower,
    followed: req.body.followed,
  });

  try {
    const checkFollow = await Follow.find({follower: req.body.follower, followed: req.body.followed})
    console.log(checkFollow)
    if (checkFollow.length > 0) {
      await Follow.findOneAndDelete({follower: req.body.follower, followed: req.body.followed})
      return res.status(201).json({message: "Follow Record Deleted"})
    }
    const newFollow = await follow.save();
    res.status(201).json(newFollow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getFollowers(req, res, next) {
  let followers;
  try {
    followers = await Follow.find({ followed: req.params.username });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.followers = followers;
  next();
}

async function getFollowing(req, res, next) {
  let following;
  try {
    following = await Follow.find({ following: req.params.username });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.following = following;
  next();
}

module.exports = router;
