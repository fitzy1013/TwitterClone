import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Button, Typography } from "@mui/material";

const SideBarItemComponent = ({ name, setCurrentPage, username }) => {
  
  const onClickHandler = (name) => {
    if (name == "Profile") {
      sessionStorage.setItem("profilePage", username)
    }
    setCurrentPage(name)
    window.location.reload();
  }

  return (
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      marginBottom: 2,
    }}
  >
    <Button variant="text" color='inherit' onClick={() => onClickHandler(name)}>
      {name == "Home" && <HomeIcon fontSize="large"/>}
      {name == "Explore" && <TagIcon fontSize="large" />}
      {name == "Notifications" && <NotificationsNoneIcon fontSize="large"/>}
      {name == "Messages" && <MailOutlineIcon fontSize="large"/>}
      {name == "Bookmarks" && <BookmarksIcon fontSize="large"/>}
      {name == "Profile" && <PersonOutlineIcon fontSize="large"/>}
      <Typography variant={"h6"} paddingLeft={5}>
        {name}
      </Typography>
    </Button>
    </Box>
  );
};

export default SideBarItemComponent;
