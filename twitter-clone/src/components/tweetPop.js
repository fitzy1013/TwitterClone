import React from 'react';
import Box from '@mui/material/Box';
import TweetSubmission from './tweetSubmission'; // Import your TweetSubmission component

const TweetPop = ({ changeTweetPopState, embedTweet, username }) => {
  console.log(embedTweet);

  return (
    <Box
      sx={{
        backgroundColor: "rgb(110, 117, 112, 0.5)",
        zIndex: 10,
        height: "100vh", // 100% of the viewport height
        width: "100%",
        position: 'fixed', // Fixed position to stay in the viewport
        left: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        overflow: 'hidden', // Hide any overflowing content
      }}
    >
      <TweetSubmission changeTweetPopState={changeTweetPopState} isPop={true} embedTweet={embedTweet} username={username} />
    </Box>
  );
};

export default TweetPop;
