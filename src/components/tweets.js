import { Avatar, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Tweet from "./tweet/tweet";
import axios from "axios";

const Tweets = ({tweets, setCurrentPage}) => {
  
  console.log(tweets)

  return (
    <Box>
      {tweets.map((item, index) => (
        <Tweet key={index} tweet={item} setCurrentPage={setCurrentPage}/>
      ))}
    </Box>
  );
};

export default Tweets;
