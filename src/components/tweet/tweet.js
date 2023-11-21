import { Avatar, Box, Button, Typography, IconButton, Icon } from "@mui/material";
import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import { valid } from "joi";

const Tweet = ({ tweet, filter, setCurrentPage, isEmbed, retweet }) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState([])
  const [retweets, setRetweets] = useState([])
  const tweetId = (retweet && isEmbed) ? retweet._id : tweet._id;
  const [isLiked, setIsLiked] = useState(false)
  const [isRetweeted, setIsRteweeted] = useState(false)
  const [likeCount, setLikeCount] = useState(0) 
  const [retweetCount, setRetweetCount] = useState(0) 

  console.log(retweets)
  console.log(tweet)
  console.log(filter)
  console.log(likes)
  console.log(user)
  console.log(retweet)

  const hasUserLiked = (username) => {
    console.log(likes.some(like => like.username == username))
    return likes.some(like => like.username == username)
  }

  const hasUserRetweeted = (username) => {
    console.log(retweets.some(retweet => retweet.username == username))
    return retweets.some(retweet => retweet.username == username)
  }


  const onProfileClick = () => {
    setCurrentPage("Profile")
    sessionStorage.setItem("profilePage", user.username)
    window.location.reload()
  }

  const handleLikeButtonClicked = async () => {
    try {
        if (hasUserLiked(sessionStorage.getItem("username"))) {
            const response = await axios.delete(`http://localhost:3002/api/likes/${tweetId}/${sessionStorage.getItem("username")}`)
            console.log(response.data)
        }
        else {
            const response = await axios.post('http://localhost:3002/api/likes', {
                tweetID: tweetId,
                username: sessionStorage.getItem("username")
            })
            console.log(response)
        }
        if (isLiked) {
          setLikeCount(likeCount - 1)
        } else {
          setLikeCount(likeCount + 1)
        }
        setIsLiked(!isLiked)
    } catch (err) {
        console.log(err.message)
    }
  }

  const handleLRetweetButtonClicked = async () => {
    try {
        if (hasUserRetweeted(sessionStorage.getItem("username"))) {
            const response = await axios.delete(`http://localhost:3002/api/retweets/${tweetId}/${sessionStorage.getItem("username")}`)
            console.log(response.data)
        }
        else {
            const response = await axios.post('http://localhost:3002/api/retweets', {
                tweetID: tweetId,
                username: sessionStorage.getItem("username")
            })
            console.log(response)
        }
        if (isRetweeted) {
          setRetweetCount(retweetCount - 1)
        } else {
          setRetweetCount(retweetCount + 1)
        }
        setIsRteweeted(!isRetweeted)
        
    } catch (err) {
        console.log(err.message)
    }
  }


    useEffect(() => {

        setIsLiked(hasUserLiked(sessionStorage.getItem("username")))
        setIsRteweeted(hasUserRetweeted(sessionStorage.getItem("username")))

        axios.get(`http://localhost:3002/api/users/${tweet.username}`)
            .then((response) => {
                setUser(response.data);

                // Request for likes
                axios.get(`http://localhost:3002/api/likes/tweet/${tweetId}`)
                    .then((response2) => {
                        setLikes(response2.data);
                        setLikeCount(response2.data.length)
                    })
                    .catch((error) => {
                        console.error("Error fetching likes:", error);
                    });

                // Request for retweets
                axios.get(`http://localhost:3002/api/retweets/tweet/${tweetId}`)
                    .then((response3) => {
                        setRetweets(response3.data);
                        setRetweetCount(response3.data.length)
                        setPageLoaded(true);
                    })
                    .catch((error) => {
                        console.error("Error fetching retweets:", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, []);

  return (
    <Box>
      {pageLoaded && (
        <Box
          marginTop={2}
          paddingBottom={2}
          paddingLeft={5}
          paddingRight={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            borderBottom: "2px solid grey",
          }}
        >
          <IconButton onClick={onProfileClick}> 
            <Avatar
                alt="GOAT"
                sx={{border: "0.5px solid black" }}
                src={user.displayImageUrl}
            />
          </IconButton>   
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="body1">
              <strong>{user.displayName}</strong> @{tweet.username}
            </Typography>
            <Typography paddingTop={1} variant="body1">
              {tweet.content}
            </Typography>
            <Box
              paddingTop={2}
              sx={{ display: "flex", flexDirection: "row", gap: 5 }}
            >
              <Box display="flex" flexDirection="row">
                <ChatBubbleOutlineIcon />
                <Typography paddingLeft={1}>
                  <strong>5</strong>
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row">
              <IconButton onClick={handleLRetweetButtonClicked} sx={{bottom: '20%'}}>
                    {isRetweeted ? <CachedOutlinedIcon sx={{color: 'green'}}/> : <CachedOutlinedIcon/>}
               </IconButton>
                <Typography paddingLeft={1}>
                  <strong>{retweetCount}</strong>
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <IconButton onClick={handleLikeButtonClicked} sx={{bottom: '20%'}}>
                    {isLiked ? <FavoriteIcon sx={{color: 'red'}}/> : <FavoriteBorderOutlinedIcon/>}
               </IconButton>
                <Typography paddingLeft={1}>
                  <strong>{likeCount}</strong>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Tweet;
