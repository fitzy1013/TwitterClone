const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Tweet = require("../models/tweet");
const Retweet = require("../models/retweet");
const tweet = require("../models/tweet");
const { ObjectId } = require('mongodb');

/*
return all retweet records
get all retweets for a specific tweet
add a new retweet record
get all retweets from a specific user
check for a specific tweet and user combination
*/

// get all retweet records
router.get("/", async (req, res) => {
  try {
    const retweets = await Retweet.find();
    res.status(201).json(retweets);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// get all retweets for a specific tweet
router.get("/tweet/:tweetID", async (req, res) => {
  let tweets;
  try {
    const searchId = new ObjectId(req.params.tweetID)
    tweets = await Retweet.find({ "tweet._id": searchId });
    res.status(201).json(tweets);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/tweetNoQuote/:tweetID", async (req, res) => {
    let tweets;
    try {
      const searchId = new ObjectId(req.params.tweetID)
      tweets = await Retweet.find({ "tweet._id": searchId, "quote": null});
      res.status(201).json(tweets);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
});

router.get('/search/:username/:tweetID', async (req, res) => {
    const searchId = new ObjectId(req.params.tweetID)
    try {
        let retweet = await Retweet.find({"tweet._id": searchId, username: req.params.username})
        res.status(201).json(retweet)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.get('/tweetRetweets/:username', async (req, res) => {
    let data = []
    try {
        let retweets =  await Retweet.find({username: req.params.username})
        for (var i = 0; i < likes.length; i++) {
            let tweet = await Tweet.findById(retweets[i].tweetID)
            data.push(tweet)
        }
        res.status(201).json(data)
    }  catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.get('/user/:username', async (req, res) => {
    let tweets
    try {
        tweets = await Retweet.find({ username: req.params.username })
        res.status(201).json(tweets)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})


router.post('/', async (req, res) => {
    console.log("atempted retweet")
    var temp_tweet;
    try {
        console.log(req.body.username)
        const user = await User.find({ username: req.body.username })
        if (user.length < 1) {
            console.log("error1")
            return res.status(400).json({ message: "This user does not exist in our database" })
        }
        temp_tweet = await Tweet.findById(req.body.tweetID)
        console.log(temp_tweet)
        if (temp_tweet == null) {
            console.log("error2")
            return res.status(400).json({ message: "This tweet does not exist in our database" })
        }
    } catch (err) { 
        return res.status(500).json({ message: err.message });
    }

    const retweet = new Retweet({
        username: req.body.username,
        tweet: temp_tweet,
        quote: req.body.quote
    })

    console.log(retweet)

    try {
        const newRetweet = await retweet.save();
        res.status(201).json(newRetweet)
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
})

router.delete("/quote/:id", async (req, res) => {
    console.log("trying to delete")
    let retweet;
      try {
          retweet = await Retweet.findById(req.params.id);
      if (retweet == null) {
        return res
          .status(400)
          .json({ message: "Retweet under this ID doesn't exist" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
      try {
          await Retweet.findByIdAndDelete(req.params.id)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.delete("/:id/:username", async (req, res) => {
    console.log("trying to delete 1")
    let retweet;
    const searchId = new ObjectId(req.params.id)
    try {
        retweet = await Retweet.find({"tweet._id": searchId, username: req.params.username});
        if (retweet == null) {
            return res
                .status(400)
                .json({ message: "Retweet under this ID doesn't exist" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    try {
        await Retweet.findOneAndDelete({ "tweet._id": searchId, username: req.params.username })
        res.status(201).json({ message: "Record Deleted Succesfuly" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
