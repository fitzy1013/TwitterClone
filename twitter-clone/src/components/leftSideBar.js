import { Box, Container, Button } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import SideBarItemComponent from "./sidebar/sideBarItemComponent";
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from "react-router";
import { useUsername } from "../context/UsernameContext"

const LeftSidebar = ({ changeTweetPopState }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const username = useUsername();

  return (
    <Container sx={{ marginTop: 2 }}>
      <TwitterIcon fontSize="large" sx={{ color: "#1DA1F2" }} />
      <Box sx={{ display: "flex", marginTop: 2, flexDirection: "column" }}>
        <SideBarItemComponent name={"Home"} />
        <SideBarItemComponent name={"Explore"} />
        <SideBarItemComponent name={"Notifications"} />
        <SideBarItemComponent name={"Messages"} />
        <SideBarItemComponent name={"Bookmarks"} />
        <SideBarItemComponent name={"Profile"} username={username} />
        <Box marginTop={10} paddingTop={20}>
          <Button variant="contained" fullWidth sx={{borderRadius: 5}} onClick={() => {
            signOut();
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('currentPage')
            navigate('/login')
            }}>
            Logout
          </Button>
        </Box>
        <Box paddingTop={5}>
          <Button variant="contained" fullWidth sx={{borderRadius: 5}} onClick={() => changeTweetPopState(null)}>
            Tweet
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LeftSidebar;
