import {
  CardHeader,
  Avatar,
  Box,
  Container,
  Typography,
  Card,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import Tweet from "../tweet/tweet";
import axios from "axios";
import useFetchUserInfo from "../../useFetch";
import OptionTweets from "../optionsTweet";

const Retweet = ({ retweet }) => {
  const [hasQuote, setHasQuote] = useState(false);
  const retweetUser = useFetchUserInfo(retweet.username);
  const [isDeleted, setIsDeleted] = useState(false);
  const [tweet, setTweet] = useState({})
  const [pageLoaded, setPageLoaded] = useState(false);

  console.log(retweet);
  console.log(retweet.item)

  const handleDeleteTweet = async () => {
    try {
      const response = axios.delete(
        `http://localhost:3002/api/retweets/quote/${retweet._id}`,
        {
          params:{
          username: retweet.username,
          quote: retweet.quote
        }}
      );
      console.log(response);
      setIsDeleted(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!retweet.quote || retweet.quote == "") {
      setHasQuote(false);
      console.log("Doesn't Have Quote");
    } else {
      setHasQuote(true);
      console.log("Does Have Quote");
    }    
  }, []);

  return (
    <Box>
      {(retweetUser && !isDeleted) && (
        <Box>
          <Box
            marginTop={2}
            paddingBottom={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              transition: "background-color 0.3s ease", // Smooth transition for background color change
              "&:hover": {
                backgroundColor: "#f5f5f5", // Grayish background on hover
              }
            }}
          >
            {!hasQuote && (
              <Box width={"100%"}>
                <CachedOutlinedIcon sx={{ paddingLeft: 2, paddingRight: 2 }} />
                <Typography variant="body3" sx={{ verticalAlign: 5 }}>
                  {retweet.username == sessionStorage.getItem("username")
                    ? "You"
                    : retweet.username}{" "}
                  retweeted this
                </Typography>
              </Box>
            )}
            {hasQuote && (
              <Box width={"100%"}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="GOAT"
                      sx={{ border: "0.5px solid black" }}
                      src={retweetUser.displayImageUrl}
                    />
                  }
                  title={
                    <span>
                      <strong>{retweetUser.displayName}</strong> @
                      {retweetUser.username}{" "}
                      <Box sx={{ float: "right" }}>
                        <OptionTweets handleDeleteTweet={handleDeleteTweet}/>
                      </Box>
                    </span>
                  }
                />
                <Typography variant="body1" sx={{ paddingLeft: 10 }}>
                  {retweet.quote}
                </Typography>{" "}
              </Box>
            )}
          </Box>
          <Tweet
            tweet={retweet.item}
            isEmbed={hasQuote ? true : false}
            retweet={retweet}
            // changeTweetPopState={changeTweetPopState}
          />
        </Box>
      )}
    </Box>
  );
};

export default Retweet;
