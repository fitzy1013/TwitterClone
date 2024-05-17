import { Box, Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import LeftSidebar from "./leftSideBar";
import MainContainer from "../components/MainContainer";
import ImageUploader from "./imageuploader";
import TweetPop from "./tweetPop";

const Dashborad = () => {
  const [username, setUsername] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [extraComponentLoaded, setExtraComponentLoaded] = useState();
  const [tweetPopState, setTweetPopState] = useState(false);
  const [embedTweet, setEmbedTweet] = useState(null);
  const [isReplyState, setIsReplyState] = useState(false);
  const [isQuoteRetweet, setIsQuoteRetweet] = useState(false);

  const changeExtraComponentLoaded = () => {
    setExtraComponentLoaded(!extraComponentLoaded);
  };

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

  console.log(currentPage);

  useEffect(() => {
    if (sessionStorage.getItem("currentPage") != null) {
      setCurrentPage(sessionStorage.getItem("currentPage"));
    } else {
      sessionStorage.setItem("currentPage", "Home");
      setCurrentPage("Home");
    }
    setUsername(sessionStorage.getItem("username"));
  }, []);

  const changeCurrentPage = (newPage) => {
    setCurrentPage(newPage);
    sessionStorage.setItem("profilePage", username);
    sessionStorage.setItem("currentPage", newPage);
  };

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

  return (
    <Container maxWidth={false} disableGutters>
      <Grid container spacing={0}>
        <Grid item xs={3} sx={{ borderRight: "1px solid black" }}>
          <LeftSidebar
            setCurrentPage={changeCurrentPage}
            username={username}
            changeTweetPopState={changeTweetPopState}
          />
        </Grid>
        <Grid item xs={5} sx={{ borderRight: "1px solid black" }}>
          <MainContainer
            currentPage={currentPage}
            username={username}
            setCurrentPage={changeCurrentPage}
            changeTweetPopState={changeTweetPopState}
          />
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

export default Dashborad;
