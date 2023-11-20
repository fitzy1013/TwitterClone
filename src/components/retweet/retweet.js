import { CardHeader, Avatar, Box, Container, Typography, Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import Tweet from "../tweet/tweet";
import axios from "axios";
import useFetchUserInfo from "../../useFetch";

const Retweet = ({ retweet }) => {
  const [hasQuote, setHasQuote] = useState(false);
  const retweetUser = useFetchUserInfo(retweet.username);

  console.log(retweet)
  
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
      {retweetUser && <Box>
      <Box
        marginTop={2}
        paddingBottom={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
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
            avatar={<Avatar
              alt="GOAT"
              sx={{ border: "0.5px solid black" }}
              src={retweetUser.displayImageUrl}
            />}
            title={<span><strong>{retweetUser.displayName}</strong> @{retweetUser.username}</span>}
            />
            <Typography variant="body1" sx={{paddingLeft: 10  }}>
              {retweet.quote}
            </Typography>{" "}
          </Box>
        )}
      </Box>
      <Tweet
        tweet={retweet.tweet}
        isEmbed={hasQuote ? true : false}
        // changeTweetPopState={changeTweetPopState}
      />
      </Box>}
    </Box>
  );
};

export default Retweet;
