import React, { useState, useEffect } from "react";
import { Box, Container, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";

const OptionTweets = ({ handleDeleteTweet, username, tweetUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  console.log(username);
  console.log(tweetUser);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {username === tweetUser && (
        <Box>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon sx={{ color: "blue" }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleDeleteTweet}>Delete Tweet</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default OptionTweets;
