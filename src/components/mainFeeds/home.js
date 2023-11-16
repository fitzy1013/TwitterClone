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

const Home = ({ username, setCurrentPage }) => {
  const [tweets, setTweets] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [user, setUser] = useState({});

  pageLoaded && console.log(tweets);

  useEffect(() => {
    setPageLoaded(false);
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
  }, [pageLoaded]);

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
      <TweetSubmission/>
      <Tweets tweets={tweets} setCurrentPage={setCurrentPage} />
    </Box>
  );
};

export default Home;
