import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Tweet from "./tweet/tweet";
import Retweet from "./retweet/retweet";

const Tweets = ({tweets, setCurrentPage, retweets, changeTweetPopState}) => {
  
  console.log(tweets)
  console.log(retweets)

  return (
    <Box>
      {tweets && tweets.map((item, index) => (
        <Tweet key={index} tweet={item} setCurrentPage={setCurrentPage} changeTweetPopState={changeTweetPopState}/>
      ))}
      {retweets && retweets.map((item, index) => (
        <Retweet key={index} retweet={item} changeTweetPopState={changeTweetPopState}/>
      ))}
    </Box>
  );
};

export default Tweets;
