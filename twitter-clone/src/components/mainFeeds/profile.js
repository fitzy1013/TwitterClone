import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ProfileLikes from "../profileSections/profilelikes";
import ProfileMedia from "../profileSections/profilemedia";
import ProfileTweets from "../profileSections/profiletweets";
import EditProfileComponent from "../profileSections/editProfileComponent";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Profile = ({
  username,
  altUsername,
  changeAltUsername,
  changeTweetPopState,
}) => {
  const [currentTab, setCurrentTab] = useState("Tweets");
  const [editProfileActive, setEditProfileActive] = useState(false);
  const [isLoggedInProfile, setIsLoggedInProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [followStats, setFollowStats] = useState(null);

  let params = useParams();
  let profileUser = params.userID;

  console.log("profile page loaded");

  console.log(followStats);
  console.log(username);
  console.log(user);

  const isFollowing = () => {
    console.log("function run");
    axios
      .get(`http://localhost:3002/api/follows/${username}/${profileUser}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onFollowButtonClick = async () => {
    try {
      const response = await axios.post("http://localhost:3002/api/follows/", {
        follower: username,
        followed: profileUser,
      });
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
    window.location.reload();
  };

  useEffect(() => {
    setPageLoaded(false);
    axios
      .get(`http://localhost:3002/api/users/${profileUser}`)
      .then((response) => {
        setUser(response.data[0]);
        setPageLoaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    axios
      .get(`http://localhost:3002/api/follows/${username}/${profileUser}`)
      .then((response) => {
        console.log(response);
        setFollowStatus(response.data.followStatus);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    axios
      .get(`http://localhost:3002/api/follows/${profileUser}`)
      .then((response) => {
        console.log(response);
        setFollowStats(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [username, profileUser]);

  const changeEditProfile = () => {
    setEditProfileActive((value) => !value);
  };

  return (
    <Box padding={0}>
      {editProfileActive && (
        <EditProfileComponent
          user={user}
          changeEditProfile={changeEditProfile}
        />
      )}
      {pageLoaded && (
        <Box>
          <div>{followStatus}</div>
          <Box
            marginTop={2}
            paddingBottom={2}
            sx={{ borderBottom: "2px solid grey" }}
          >
            <Typography variant="h5">
              {followStatus ? <strong>Test</strong> : <strong>Test2</strong>}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                backgroundColor: "rgb(207, 217, 222)",
                height: "150px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={user.bannerImageUrl || "default_banner_image_url"}
                alt="Banner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Avatar
                src={user.displayImageUrl}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: "20px",
                  width: "100px",
                  height: "100px",
                  border: "4px solid white",
                }}
              />
            </Box>
            <Box>
              {username === profileUser ? (
                <Button
                  variant="outlined"
                  sx={{ float: "right", borderRadius: 6 }}
                  onClick={() => setEditProfileActive(true)}
                >
                  <strong>Edit Profile</strong>
                </Button>
              ) : (
                <Button
                  variant={followStatus ? "contained" : "outlined"}
                  sx={{ float: "right", borderRadius: 6, color: "black" }}
                  onClick={onFollowButtonClick}
                >
                  <strong>{followStatus ? "Following" : "Follow"}</strong>
                </Button>
              )}
            </Box>
            <Box>
              <Typography variant="h6">
                <strong>{user.displayName}</strong>
              </Typography>
              <Typography variant="body2">@{user.username}</Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                {user.bio === "" ? "User doesn't have a bio yet" : user.bio}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <CalendarMonthIcon fontSize="small" />
              <Typography variant="body2">Joined November 1921</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
              <Typography variant="body2">
                {followStats && <strong>{followStats.following.length}</strong>} Following
              </Typography>
              <Typography variant="body2">
                {followStats && <strong>{followStats.followers.length}</strong>} Followers
              </Typography>
            </Box>
          </Box>
          <Box
            marginTop={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid grey",
              paddingBottom: 1,
            }}
          >
            <Button
              variant="text"
              sx={{ width: "33.3333%" }}
              onClick={() => setCurrentTab("Tweets")}
            >
              <Typography
                variant="button"
                sx={{
                  paddingBottom: 1,
                  borderBottom:
                    currentTab === "Tweets" ? "1px solid blue" : "none",
                }}
              >
                <strong>Tweets</strong>
              </Typography>
            </Button>
            <Button
              variant="text"
              sx={{ width: "33.3333%" }}
              onClick={() => setCurrentTab("Media")}
            >
              <Typography
                variant="button"
                sx={{
                  paddingBottom: 1,
                  borderBottom:
                    currentTab === "Media" ? "1px solid blue" : "none",
                }}
              >
                <strong>Media</strong>
              </Typography>
            </Button>
            <Button
              variant="text"
              sx={{ width: "33.3333%" }}
              onClick={() => setCurrentTab("Likes")}
            >
              <Typography
                variant="button"
                sx={{
                  paddingBottom: 1,
                  borderBottom:
                    currentTab === "Likes" ? "1px solid blue" : "none",
                }}
              >
                <strong>Likes</strong>
              </Typography>
            </Button>
          </Box>
          <Box>
            {currentTab === "Tweets" && (
              <ProfileTweets
                user={user}
                changeTweetPopState={changeTweetPopState}
              />
            )}
            {currentTab === "Media" && <ProfileMedia user={user} />}
            {currentTab === "Likes" && (
              <ProfileLikes
                user={user}
                changeTweetPopState={changeTweetPopState}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;


