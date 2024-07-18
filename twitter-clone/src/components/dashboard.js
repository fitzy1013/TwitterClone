import { Box, Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import LeftSidebar from "./leftSideBar";
import MainContainer from "../components/MainContainer";
import TweetPop from "./tweetPop";

const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [tweetPopState, setTweetPopState] = useState(false);
  const [embedTweet, setEmbedTweet] = useState(null);
  const [isReplyState, setIsReplyState] = useState(false);
  const [isQuoteRetweet, setIsQuoteRetweet] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      setUsername(auth().username);
    }
  }, []);

  const changeTweetPopState = (embedTweetTemp, isReply) => {
    console.log(embedTweetTemp);
    if (embedTweetTemp != null) {
      setEmbedTweet(embedTweetTemp);

      if (embedTweetTemp.quote != null) {
        setIsQuoteRetweet(true);
      }
    } else {
      setEmbedTweet(null);
    }

    if (isReply != null) {
      setIsReplyState(isReply);
    }
    setTweetPopState(!tweetPopState);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Grid container spacing={0}>
        <Grid item xs={3} sx={{ borderRight: "1px solid black" }}>
          <LeftSidebar username={username} changeTweetPopState={changeTweetPopState} />
        </Grid>
        <Grid item xs={5} sx={{ borderRight: "1px solid black" }}>
          <MainContainer username={username} changeTweetPopState={changeTweetPopState} />
        </Grid>
        {tweetPopState && (
          <TweetPop
            changeTweetPopState={changeTweetPopState}
            embedTweet={embedTweet}
            username={username}
            isReply={isReplyState}
            isQuoteRetweet={isQuoteRetweet}
          />
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
