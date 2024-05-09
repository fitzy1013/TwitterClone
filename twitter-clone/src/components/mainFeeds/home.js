import {
  Avatar,
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Tweets from "../tweets";
import axios from "axios";
import TweetSubmission from "../tweetSubmission";

const Home = ({ username, setCurrentPage, changeTweetPopState }) => {
  const [tweetContent, setTweetContent] = useState("");
  const [tweetError, setTweetError] = useState("");
  const [tweets, setTweets] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [user, setUser] = useState({});

  console.log(user)

  pageLoaded && console.log(tweets);

  useEffect(() => {
    if (!pageLoaded) {
      axios
        .get("http://localhost:3002/api/tweets")
        .then((response) => {
          setTweets(response.data);
          axios
            .get(`http://localhost:3002/api/users/${username}`)
            .then((response) => {
              setUser(response.data);
            });
          setPageLoaded(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [pageLoaded]);

  const onSumbitTweet = async (e) => {
    e.preventDefault();
    setTweetError(null);
    if (tweetContent == "") {
      return setTweetError("Tweet is Empty");
    }

    try {
      const response = await axios.post("http://localhost:3002/api/tweets", {
        username,
        content: tweetContent,
      });
      if (response.status == 201) {
        console.log("Tweet Succesfully Posted");
        setTweetContent("");
        window.location.reload();
      }
    } catch (err) {
      console.log(err.response.data.message);
      setTweetError(err.response.data.message);
    }
  };

  return (
    <Box padding={0}>
      <Box
        marginTop={2}
        paddingBottom={2}
        sx={{ borderBottom: "2px solid grey" }}
      >
        <Typography variant="h5">
          <strong>Home</strong>
        </Typography>
      </Box>
      <Box
        marginTop={2}
        paddingBottom={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          borderBottom: "2px solid grey",
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
      <Tweets tweets={tweets} setCurrentPage={setCurrentPage} changeTweetPopState={changeTweetPopState}/>
    </Box>
  );
};

export default Home;
