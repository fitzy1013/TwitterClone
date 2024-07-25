import React, { useState, useEffect } from "react";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OptionTweets from "../optionsTweet";
import TweetActions from "./tweetActions";

const Tweet = ({ tweet, filter, isEmbed, retweet, changeTweetPopState }) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  const onProfileClick = () => {
    navigate(`/profile/${user.username}`);
  };

  const onTweetClick = () => {
    navigate(`/tweet/${tweet._id}`);
  };

  const handleDeleteTweet = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/tweets/${tweet._id}`
      );
      console.log(response);
      setIsDeleted(true);
    } catch (err) {
      console.log(err.message);
    }
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

      setUsername(sessionStorage.getItem("username"));
      setLikes(tweet.likes);
      setRetweets(tweet.retweets);
      setReplies(tweet.replies || []);
      setPageLoaded(true);
    } else {
      setPageLoaded(true);
    }
  }, [tweet]);

  return (
    <Box>
      {pageLoaded && !isDeleted && (
        <Box
          marginTop={1}
          paddingBottom={2}
          paddingLeft={isEmbed ? 5 : 0}
          paddingRight={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            borderBottom: "2px solid grey",
            borderRadius: isEmbed ? "10px" : "0px",
            border: isEmbed ? "1px solid #ccc" : "none",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          {tweet && (
            <IconButton onClick={onProfileClick}>
              <Avatar
                alt="GOAT"
                sx={{ border: "0.5px solid black", marginBottom: "50px" }}
                src={user.displayImageUrl}
              />
            </IconButton>
          )}
          <Box
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <Typography variant="body1">
              <strong>{user.displayName}</strong>
              {tweet && (
                <>
                  {" "}
                  @
                  {user.username}
                </>
              )}
              {!isEmbed && (
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
              <Typography
                paddingTop={1}
                variant="body1"
                onClick={onTweetClick}
                sx={{
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e0f7fa",
                    cursor: "pointer",
                  },
                }}
              >
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
              <TweetActions
                tweet={tweet}
                replies={replies}
                retweets={retweets}
                likes={likes}
                username={username}
                changeTweetPopState={changeTweetPopState}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Tweet;
