import { Container, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TweetSubmission from './tweetSubmission';
import Tweet from './tweet/tweet';

const TweetPop = ({changeTweetPopState, username, embedTweet}) => {
    
  console.log(embedTweet)

    return (
        <Box
        sx={{
          backgroundColor: "rgb(110, 117, 112, 0.5)",
          zIndex: 10,
          height: "100%",
          width: "100%",
          position: 'absolute',
          left: 1,
          bottom: 1,
          top: 1
        }}
      >
        <TweetSubmission changeTweetPopState={changeTweetPopState} username={username} isPop={true} embedTweet={embedTweet}/>
      </Box>
    )
}

export default TweetPop;