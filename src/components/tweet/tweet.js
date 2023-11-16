import {
  Avatar,
  Box,
  Button,
  Typography,
  IconButton,
  Icon,
  Menu,
  MenuItem,
  CardHeader,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TweetPop from "../tweetPop";
import axios from "axios";

const Tweet = ({
  tweet,
  filter,
  setCurrentPage,
  isEmbed,
  changeTweetPopState,
}) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [tweetPopActive, setTweetPopActive] = useState(true);
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  console.log(tweet);
  console.log(filter);
  console.log(likes);
  console.log(user);
  console.log(retweets);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = () => {
    deleteTweet();
    handleClose();
    window.location.reload();
  };

  const hasUserLiked = (username) => {
    console.log(likes.some((like) => like.username == username));
    return likes.some((like) => like.username == username);
  };

  const hasUserRetweeted = (username) => {
    console.log(retweets.some((retweet) => retweet.username == username));
    return retweets.some((retweet) => retweet.username == username);
  };

  const onProfileClick = () => {
    setCurrentPage("Profile");
    sessionStorage.setItem("profilePage", user.username);
    window.location.reload();
  };

  const handleLikeButtonClicked = async () => {
    try {
      if (hasUserLiked(sessionStorage.getItem("username"))) {
        const response = await axios.delete(
          `http://localhost:3002/api/likes/${
            tweet._id
          }/${sessionStorage.getItem("username")}`
        );
        console.log(response.data);
        updateData();
      } else {
        const response = await axios.post("http://localhost:3002/api/likes", {
          tweetID: tweet._id,
          username: sessionStorage.getItem("username"),
        });
        console.log(response);
        updateData();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTweet = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/tweets/${tweet._id}`
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRetweetButtonClicked = async () => {
    try {
      if (hasUserRetweeted(sessionStorage.getItem("username"))) {
        const response = await axios.delete(
          `http://localhost:3002/api/retweets/${
            tweet._id
          }/${sessionStorage.getItem("username")}`
        );
        console.log(response.data);
        updateData();
      } else {
        const response = await axios.post(
          "http://localhost:3002/api/retweets",
          {
            tweetID: tweet._id,
            username: sessionStorage.getItem("username"),
          }
        );
        console.log(response);
        updateData();
      }
    } catch (err) {
      console.log(err.message);
    }
    handleClose();
  };

  const updateData = async () => {
    axios
      .get(`http://localhost:3002/api/users/${tweet.username}`)
      .then((response) => {
        setUser(response.data);
        axios
          .get(`http://localhost:3002/api/likes/tweet/${tweet._id}`)
          .then((response) => {
            console.log(response);
            setLikes(response.data);
            axios
              .get(`http://localhost:3002/api/retweets/tweet/${tweet._id}`)
              .then((response) => {
                console.log(response);
                setRetweets(response.data);
                setPageLoaded(true);
              });
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <Box>
      {pageLoaded && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            padding: 2,
            margin: 1,
            border: "0.5px solid grey",
            borderRadius: 2,
            width: isEmbed ? '75%' : '95%',
            marginLeft: isEmbed ? 8 : 0,
            marginRight: 2
          }}
        >
          <Box sx={{display: "flex", flexDirection: "column" }}>
            <Box>
              <IconButton onClick={onProfileClick}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="GOAT"
                      sx={{ border: "0.5px solid black" }}
                      src={user.displayImageUrl}
                    />
                  }
                  title={
                    <span>
                      <strong>{user.displayName}</strong> @{user.username}
                    </span>
                  }
                />
              </IconButton>
              {!isEmbed && (
                <IconButton
                  onClick={handleClick}
                  sx={{ float: "right", marginRight: 5 }}
                >
                  <MoreHorizIcon />
                </IconButton>
              )}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleOptionClick}>Delete Tweet</MenuItem>
              </Menu>
            </Box>
            <Typography sx={{marginLeft: 4}} variant="body1">{tweet.content}</Typography>
            {!isEmbed && (
              <Box
                paddingTop={2}
                sx={{ display: "flex", flexDirection: "row", gap: 5, marginLeft: 4 }}
              >
                <Box display="flex" flexDirection="row">
                  <ChatBubbleOutlineIcon />
                  <Typography paddingLeft={1}>
                    <strong>0</strong>
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Typography variant="body1">
                    <IconButton onClick={handleClick} sx={{ bottom: "20%" }}>
                      {hasUserRetweeted(sessionStorage.getItem("username")) ? (
                        <CachedOutlinedIcon sx={{ color: "green" }} />
                      ) : (
                        <CachedOutlinedIcon />
                      )}
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleRetweetButtonClicked}>
                        Retweet
                      </MenuItem>
                      <MenuItem onClick={() => changeTweetPopState(tweet)}>
                        Retweet with Quote
                      </MenuItem>
                    </Menu>
                  </Typography>
                  <Typography paddingLeft={1}>
                    <strong>{retweets.length}</strong>
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <IconButton
                    onClick={handleLikeButtonClicked}
                    sx={{ bottom: "20%" }}
                  >
                    {hasUserLiked(sessionStorage.getItem("username")) ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </IconButton>
                  <Typography paddingLeft={1}>
                    <strong>{likes.length}</strong>
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
