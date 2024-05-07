const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Like = require("../models/likes");
const Tweet = require("../models/tweet");

/*
get all likes for a specific tweetID
get all likes from a specific user
post a new like record and then delete one when un-liked
*/

// get all likes records
router.get("/", async (req, res) => {
  try {
    const likes = await Like.find();
    res.status(201).json(likes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


// get all likes for a specific tweet
router.get('/tweet/:tweetID', async (req, res) => {
    let tweets
    try {
        tweets = await Like.find({ tweetID: req.params.tweetID })
        res.status(201).json(tweets)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.get('/search/:username/:tweetID', async (req, res) => {
    try {
        let like = await Like.find({tweetID: req.params.tweetID, username: req.params.username})
        res.status(201).json(like)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.get('/tweetLikes/:username', async (req, res) => {
    let data = []
    try {
        let likes =  await Like.find({username: req.params.username})
        for (var i = 0; i < likes.length; i++) {
            let tweet = await Tweet.findById(likes[i].tweetID)
            data.push(tweet)
        }
        res.status(201).json(data)
    }  catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

// get all likes for a specific user
router.get('/user/:username', async (req, res) => {
    let tweets
    try {
        tweets = await Like.find({ username: req.params.username })
        res.status(201).json(tweets)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username })
        if (user.length < 1) {
            return res.status(400).json({ message: "This user does not exist in our database" })
        }
        const tweet = await Tweet.findById(req.body.tweetID)
        console.log(tweet)
        if (tweet == null) {
            return res.status(400).json({ message: "This tweet does not exist in our database" })
        }
    } catch (err) { 
        return res.status(500).json({ message: err.message });
    }

    const like = new Like({
        username: req.body.username,
        tweetID: req.body.tweetID
    })

    try {
        const newLike = await like.save();
        res.status(201).json(newLike)
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
})

router.delete("/:id/:username", async (req, res) => {
    let like;
    try {
        like = await Like.find({tweetID: req.params.id, username: req.params.username});
        if (like == null) {
            return res
                .status(400)
                .json({ message: "Like under this ID doesn't exist" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    try {
        await Like.findOneAndDelete({ tweetID: req.params.id, username: req.params.username })
        res.status(201).json({ message: "Record Deleted Succesfuly" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
