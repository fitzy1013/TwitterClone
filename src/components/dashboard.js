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
  const [tweetPopActive, setTweetPopActive] = useState(false);
  const [embedTweetPop, setEmbedTweetPop] = useState(null);

  const changeExtraComponentLoaded = () => {
    setExtraComponentLoaded((value) => !value);
  };

  const changeTweetPopState = (embedTweet) => {
    console.log(embedTweet);
    if (!tweetPopActive) {
      setEmbedTweetPop(embedTweet);
    }
    if (tweetPopActive) {
      setEmbedTweetPop(null);
    }
    setTweetPopActive((value) => !value);
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
    <Box>
      {tweetPopActive && (
        <TweetPop
          username={username}
          changeTweetPopState={changeTweetPopState}
          embedTweet={embedTweetPop}
        />
      )}
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
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashborad;
