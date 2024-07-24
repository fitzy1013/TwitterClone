import React, { createContext, useContext, useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import UsernameProvider from "../context/UsernameContext"
import LeftSidebar from "./leftSideBar";
import MainContainer from "../components/MainContainer";
import TweetPop from "./tweetPop";

const Dashboard = () => {
  const [tweetPopState, setTweetPopState] = useState(false);
  const [embedTweet, setEmbedTweet] = useState(null);   
  const [isReplyState, setIsReplyState] = useState(false);
  const [isQuoteRetweet, setIsQuoteRetweet] = useState(false);

  const changeTweetPopState = (embedTweetTemp, isReply) => {
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
    <UsernameProvider>
      <Container maxWidth={false} disableGutters>
        <Grid container spacing={0}>
          <Grid item xs={3} sx={{ borderRight: "1px solid black" }}>
            <LeftSidebar changeTweetPopState={changeTweetPopState} />
          </Grid>
          <Grid item xs={5} sx={{ borderRight: "1px solid black" }}>
            <MainContainer changeTweetPopState={changeTweetPopState} />
          </Grid>
          {tweetPopState && (
            <TweetPop
              changeTweetPopState={changeTweetPopState}
              embedTweet={embedTweet}
              isReply={isReplyState}
              isQuoteRetweet={isQuoteRetweet}
            />
          )}
        </Grid>
      </Container>
    </UsernameProvider>
  );
};

export default Dashboard;