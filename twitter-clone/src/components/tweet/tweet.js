import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import OptionTweets from "../optionsTweet";

const Tweet = ({
  tweet,
  filter,
  setCurrentPage,
  isEmbed,
  retweet,
  changeTweetPopState,
}) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const tweetId = retweet && isEmbed ? retweet._id : tweet._id;
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [liked, setLiked] = useState(false);
  const open = Boolean(anchorEl);
  const [username, setUsername] = useState(null);

  console.log(retweets);
  console.log(tweet);
  console.log(filter);
  console.log(likes);
  console.log(user);
  console.log(retweet);
  console.log(isRetweeted);

  const hasUserLiked = (username) => {
    console.log(likes.some((like) => like.username === username));
    return likes.some((like) => like.username === username);
  };

  const hasUserRetweetedWithoutQuote = (username) => {
    var found = false;
    for (var i = 0; i < retweets.length && !found; i++) {
      if ((retweets[i].username = username && retweets[i].quote == null)) {
        found = true;
      }
    }

    return found;
  };

  const onProfileClick = () => {
    setCurrentPage("Profile");
    sessionStorage.setItem("profilePage", user.username);
    window.location.reload();
  };

  const handleLikeButtonClicked = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const body = {
        username,
        itemId: tweetId,
      };

      if (liked) {
        const response = await axios.delete(
          `http://localhost:3002/api/likes/${tweetId}/${username}`
        );
        console.log(response.data);
      } else {
        const response = await axios.post(
          "http://localhost:3002/api/likes",
          body
        );
        console.log(response);
      }

      if (liked) {
        setLikeCount(likeCount - 1);
        setLiked(false);
      } else {
        setLikeCount(likeCount + 1);
        setLiked(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReplyButtonClicked = async () => {
    // send a tweet pop state and then handleClose();
    changeTweetPopState(tweet, true);
    handleClose();
  };

  const handleLRetweetButtonClicked = async () => {
    try {
      if (hasUserRetweetedWithoutQuote(username)) {
        const response = await axios.delete(
          `http://localhost:3002/api/retweets/${tweetId}`,
          {
            params: {
              username: sessionStorage.getItem("username"),
            },
          }
        );
        console.log(response.data);
      } else {
        const response = await axios.post(
          "http://localhost:3002/api/retweets",
          {
            tweetID: tweetId,
            username: username,
          }
        );
        console.log(response);
      }
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteTweet = async () => {
    try {
      const response = axios.delete(
        `http://localhost:3002/api/tweets/${tweet._id}`
      );
      console.log(response);
      setIsDeleted(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRetweetWithQuoteButtonClicked = () => {
    changeTweetPopState(tweet, false);
    handleClose();
  };

  const howManyRetweetsWithoutQuote = (retweets) => {
    var count = 0;
    for (var i = 0; i < retweets.length; i++) {
      if (retweets[i].quote == null) {
        count++;
      }
    }

    return count;
  };

  useEffect(() => {
    if (tweet) {
      axios
        .get(`http://localhost:3002/api/users/${tweet.username}`)
        .then((response) => {
          setUser(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });

      setLiked(hasUserLiked(sessionStorage.getItem("usernane")));
      setUsername(sessionStorage.getItem("username"));
      setLikes(tweet.likes);
      console.log(tweet);
      setLikeCount(tweet.likes.length);
      setRetweets(tweet.retweets);
      setRetweetCount(howManyRetweetsWithoutQuote(retweets));
      setPageLoaded(true);
    } else {
      console.log("no tweet is present");
      setPageLoaded(true);
    }
  }, [pageLoaded]);

  return (
    <Box>
      {pageLoaded && !isDeleted && (
        <Box
          marginTop={1}
          paddingBottom={2}
          paddingTop={2}
          paddingLeft={isEmbed ? 5 : 0}
          paddingRight={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            borderBottom: "2px solid grey",
            borderRadius: isEmbed ? "10px" : "0px", // Rounded border for embed
            border: isEmbed ? "1px solid #ccc" : "none", // Border style for embed
            transition: "background-color 0.3s ease", // Smooth transition for background color change
            "&:hover": {
              backgroundColor: "#f5f5f5", // Grayish background on hover
            },
          }}
        >
          {tweet && (
            <IconButton onClick={onProfileClick}>
              <Avatar
                alt="GOAT"
                sx={{ border: "0.5px solid black", marginBottom: "50px" }} // Adjust marginTop for avatar position
                src={user.displayImageUrl}
              />
            </IconButton>
          )}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="body1">
              <strong>{user.displayName}</strong>
              {tweet && (
                <>
                  {" "}
                  @
                  {user.username} {/* Render user.username */}
                </>
              )}
              {!isEmbed && username == tweet.username && (
                <Box sx={{ float: "right" }}>
                  <OptionTweets
                    handleDeleteTweet={handleDeleteTweet}
                    username={username}
                    tweetUser={tweet ? tweet.username : null}
                  />
                </Box>
              )}
            </Typography>
            {tweet ? (
              <Typography paddingTop={1} variant="body1">
                {tweet.content}
              </Typography>
            ) : (
              <Typography
                paddingTop={1}
                variant="body1"
                sx={{ textAlign: "center" }}
              >
                Original tweet has been deleted
              </Typography>
            )}
            {!isEmbed && (
              <Box
                paddingTop={2}
                sx={{ display: "flex", flexDirection: "row", gap: 5 }}
              >
                <Box display="flex" flexDirection="row">
                  <IconButton
                    onClick={handleReplyButtonClicked}
                    sx={{ bottom: "20%" }}
                  >
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <Typography paddingLeft={1}>
                    <strong>{replies.length}</strong>
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <IconButton onClick={handleClick} sx={{ bottom: "20%" }}>
                    {hasUserRetweetedWithoutQuote(username) ? (
                      <CachedOutlinedIcon sx={{ color: "green" }} />
                    ) : (
                      <CachedOutlinedIcon />
                    )}
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleLRetweetButtonClicked}>
                      Retweet
                    </MenuItem>
                    <MenuItem onClick={handleRetweetWithQuoteButtonClicked}>
                      Retweet with Quote
                    </MenuItem>
                  </Menu>
                  <Typography paddingLeft={1}>
                    <strong>{retweetCount}</strong>
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <IconButton
                    onClick={handleLikeButtonClicked}
                    sx={{ bottom: "20%" }}
                  >
                    {liked ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </IconButton>
                  <Typography paddingLeft={1}>
                    <strong>{likeCount}</strong>
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  ); 
};

export default Tweet;
