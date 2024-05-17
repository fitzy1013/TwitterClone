import React, { useEffect, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

const TweetActions = ({
  tweet,
  replies,
  retweets,
  likes,
  username,
  changeTweetPopState,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [retweetCount, setRetweetCount] = useState(
    retweets.filter((retweet) => retweet.quote == null).length
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const hasUserLiked = (username) => {
    return likes.some((like) => like.username === username);
  };

  const hasUserRetweetedWithoutQuote = (username) => {
    return retweets.some(
      (retweet) => retweet.username === username && retweet.quote == null
    );
  };

  const handleLikeButtonClicked = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const body = {
        username,
        itemId: tweet._id,
      };

      if (liked) {
        const response = await axios.delete(
          `http://localhost:3002/api/likes/${tweet._id}/${username}`
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

  const handleReplyButtonClicked = async () => {
    changeTweetPopState(tweet, true);
  };

  const handleLRetweetButtonClicked = async () => {
    try {
      if (hasUserRetweetedWithoutQuote(username)) {
        const response = await axios.delete(
          `http://localhost:3002/api/retweets/${tweet._id}`,
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
            tweetID: tweet._id,
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

  const handleRetweetWithQuoteButtonClicked = () => {
    changeTweetPopState(tweet, false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setLiked(hasUserLiked(username))
  }, [])

  return (
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
          <MenuItem onClick={handleLRetweetButtonClicked}>Retweet</MenuItem>
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
  );
};

export default TweetActions;