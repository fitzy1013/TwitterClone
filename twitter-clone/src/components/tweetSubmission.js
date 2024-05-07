import {
  Avatar,
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import Tweet from "./tweet/tweet";

const TweetSubmission = ({
  changeTweetPopState,
  isPop,
  embedTweet,
  username
}) => {
  const [tweetContent, setTweetContent] = useState("");
  const [tweetError, setTweetError] = useState("");
  const [user, setUser] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);

  console.log(username);

  useEffect(() => {
    setPageLoaded(false);
    axios
      .get(`http://localhost:3002/api/users/${username}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setPageLoaded(true);
  }, [pageLoaded]);

  const onSumbitTweet = async (e) => {
    e.preventDefault();
    setTweetError(null);
    if (tweetContent == "") {
      return setTweetError("Tweet is Empty");
    }

    
    try {
      if (embedTweet != null) {
        const response = await axios.post(
          "http://localhost:3002/api/retweets",
          {
            tweetID: embedTweet._id,
            username: sessionStorage.getItem("username"),
            quote: tweetContent
          }
        );
        console.log(response);
        setTweetContent("")
        window.location.reload();
      }
      else {
      const response = await axios.post("http://localhost:3002/api/tweets", {
        username,
        content: tweetContent,
      });
      if (response.status == 201) {
        console.log("Tweet Succesfully Posted");
        setTweetContent("");
        window.location.reload();
      }
    }
    } catch (err) {
      console.log(err.response.data.message);
      setTweetError(err.response.data.message);
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        backgroundColor: "white",
        border: "2px solid #1DA1F2",
        borderRadius: 5,
        position: "relative",
        zIndex: 11,
      }}
    >
       <Box margin={3}>
        {isPop && (
          <IconButton
            sx={{ float: "right" }}
            onClick={() => changeTweetPopState()}
          >
            <CancelIcon />
          </IconButton>
        )}
        <Box
          marginTop={2}
          paddingBottom={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Avatar
            alt="GOAT"
            sx={{ width: 40, height: 40, border: "0.5px solid black" }}
            src={user.displayImageUrl}
          />
          <Box component="form" style={{ width: "100%" }}>
            <TextField
              style={{ textAlign: "left", width: "100%" }}
              placeholder="What's happening?"
              multiline
              rows={3}
              paddingBottom={2}
              required
              onChange={(e) => setTweetContent(e.target.value)}
              value={tweetContent}
            />
            {embedTweet != null && <Tweet tweet={embedTweet} isEmbed={true} />}
            <Button
              onClick={onSumbitTweet}
              variant="contained"
              style={{ float: "right", borderRadius: 6, marginTop: 5 }}
            >
              Tweet
            </Button>
            {tweetError && (
              <Alert sx={{ float: "left" }} severity="error">
                {tweetError}
              </Alert>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TweetSubmission;
