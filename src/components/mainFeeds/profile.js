import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ProfileLikes from "../profileSections/profilelikes";
import ProfileMedia from "../profileSections/profilemedia";
import ProfileTweets from "../profileSections/profiletweets";
import EditProfileComponent from "../profileSections/editProfileComponent";
import axios from "axios";

const Profile = ({username, altUsername, changeAltUsername, setCurrentPage}) => {

    const [currentTab, setCurrentTab] = useState("Tweets")
    const [editProfileActive, setEditProfileActive] = useState(false)
    const [isLoggedInProfile, setIsLoggedInProfile] = useState(false)
    const [user, setUser] = useState(null)
    const [pageLoaded, setPageLoaded] = useState(false)

    console.log(username)
    console.log(user)

    const isFollowing = async () => {
      let response
      try {
        response = await axios.get(`http://localhost:3002/api/follows/${username}/${sessionStorage.getItem("profilePage")}`)
        return response.data.followStatus
      } catch (err) {
        console.log(err.message)
      }
    }

    const onFollowButtonClick =  async () => {
      let response 
      try {
        response = await axios.post('http://localhost:3002/api/follows/' ,{
          follower: username,
          followed: sessionStorage.getItem("profilePage")
        })
        console.log(response)
      } catch (err) {
        console.log(err.message)
      }

      window.location.reload()
    }


    useEffect(() => {
      setPageLoaded(false)
      const userInput = (sessionStorage.getItem("profilePage") == "null") ? username : sessionStorage.getItem("profilePage")
      console.log(userInput)
      axios.get(`http://localhost:3002/api/users/${userInput}`)
        .then(response => {
          setUser(response.data)
          setPageLoaded(true)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [])

    const changeEditProfile = () => {
      setEditProfileActive(value => !value)
    }

  return (
    <Box padding={0}>
       {editProfileActive && <EditProfileComponent user={user} changeEditProfile={onFollowButtonClick}/>}
       { pageLoaded && <Box>
      <Box
        marginTop={2}
        paddingBottom={2}
        sx={{ borderBottom: "2px solid grey" }}
      >
        <Typography variant="h5">
          <strong>Profile</strong>
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}>
        <Box
          sx={{ backgroundColor: "rgb(207, 217, 222)", height: "150px" }}
        >
            <Avatar src={user.displayImageUrl} sx={{display: 'relative', top: 85, left: 20, width: 100, height: 100, border: '4px solid white'}}/>
        </Box>
        
        <Box>
          {(username == sessionStorage.getItem("profilePage")) ? 
          <Button variant="outlined" sx={{ float: "right", borderRadius: 6 }} onClick={() => setEditProfileActive(true)}>
            <strong>Edit Profile</strong>
          </Button> : 
          <Button variant="outlined" sx={{ float: "right", borderRadius: 6 }} onClick={onFollowButtonClick}>
            <strong>{(isFollowing) ? "Follow" : "Following"}</strong>
          </Button> }
        </Box>
        <Box>
          <Typography variant="h6">
            <strong>{user.displayName}</strong>
          </Typography>
          <Typography variant="body2">@{user.username}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{(user.bio == "" ) ? "User doesn't have a bio yet" : user.bio}</Typography>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
            <CalendarMonthIcon fontSize="small"/>
            <Typography variant="body2">Joined Novemeber 1921</Typography>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: 4}}>
            <Typography variant='body2'><strong>0</strong> Following</Typography>
            <Typography variant='body2'><strong>1,000</strong> Followers</Typography>
        </Box>
      </Box>
      <Box marginTop={4} sx={{display: 'flex', flexDirection: 'row', borderBottom: '1px solid grey', paddingBottom: 1}}>
        <Button variant='text' sx={{width: '33.3333%'}} onClick={() => setCurrentTab("Tweets")}>
            <Typography variant='button' sx={{paddingBottom: 1, borderBottom: (currentTab == "Tweets") ? '1px solid blue' : 'none'}}><strong>Tweets</strong></Typography>
        </Button>
        <Button variant='text' sx={{width: '33.3333%'}} onClick={() => setCurrentTab("Media")} >
        <Typography variant='button' sx={{paddingBottom: 1, borderBottom: (currentTab == "Media") ? '1px solid blue' : 'none'}}><strong>Media</strong></Typography>
        </Button>
        <Button variant='text' sx={{width: '33.3333%'}} onClick={() => setCurrentTab("Likes")}>
        <Typography variant='button' sx={{paddingBottom: 1, borderBottom: (currentTab == "Likes") ? '1px solid blue' : 'none'}}><strong>Likes</strong></Typography>
        </Button>
      </Box>
       <Box>
        {(currentTab == "Tweets" && <ProfileTweets user={user} setCurrentPage={setCurrentPage}/>)}
        {(currentTab == "Media" && <ProfileMedia user={user}/>)}
        {(currentTab == "Likes" && <ProfileLikes user={user} setCurrentPage={setCurrentPage}/>)}
      </Box>
      </Box> }
    </Box> 
  );
};

export default Profile;
