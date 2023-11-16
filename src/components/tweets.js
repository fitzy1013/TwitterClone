import { Avatar, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Tweet from "./tweet/tweet";
import axios from "axios";
<<<<<<< HEAD
import Retweet from "./retweet/retweet";

const Tweets = ({tweets, setCurrentPage, retweets, changeTweetPopState}) => {
  
  console.log(tweets)
  console.log(retweets)

  return (
    <Box sx={{borderTop: '1px solid grey'}}>
      {tweets.map((item, index) => (
        <Tweet key={index} tweet={item} setCurrentPage={setCurrentPage} isEmbed={false} changeTweetPopState={changeTweetPopState}/>
      ))}
      {retweets && retweets.map((item, index) => (
        <Retweet key={index} retweet={item} changeTweetPopState={changeTweetPopState}/>
=======

const Tweets = ({tweets, setCurrentPage}) => {
  
  console.log(tweets)

  return (
    <Box>
      {tweets.map((item, index) => (
        <Tweet key={index} tweet={item} setCurrentPage={setCurrentPage}/>
>>>>>>> 425f016a9c4d16b4f1c8160c55f3e35c97edb32c
      ))}
    </Box>
  );
};

export default Tweets;
