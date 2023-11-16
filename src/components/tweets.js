import { Avatar, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Tweet from "./tweet/tweet";
import axios from "axios";
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
      ))}
    </Box>
  );
};

export default Tweets;
