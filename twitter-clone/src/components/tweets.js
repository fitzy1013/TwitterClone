import { Box } from "@mui/material";
import React from "react";
import Tweet from "./tweet/tweet";
import Retweet from "./retweet/retweet";
import { useNavigate } from "react-router-dom";


const Tweets = ({ tweets, retweets, changeTweetPopState }) => {
  const navigate = useNavigate();

  console.log(tweets);
  console.log(retweets);

  return (
    <Box>
      {tweets &&
        tweets.map((item, index) => (
          <Tweet
            key={index}
            tweet={item}
            navigate={navigate}
            changeTweetPopState={changeTweetPopState}
            isEmbed={false}
          />
        ))}
      {retweets &&
        retweets.map((item, index) => (
          <Retweet
            key={index}
            retweet={item}
            navigate={navigate}
            changeTweetPopState={changeTweetPopState}
            isEmbed={false}
          />
        ))}
    </Box>
  );
};

export default Tweets;
