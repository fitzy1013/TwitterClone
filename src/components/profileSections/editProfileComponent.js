import {
  Box,
  Button,
  Container,
  IconButton,
  Avatar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const EditProfileComponent = ({ changeEditProfile, user }) => {

    const [displayImageUrl, setDisplayImageUrl] = useState('');
    const [bannerImageUrl, setBannerImageUrl] = useState('');
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')

    useEffect(() => {
        setBannerImageUrl(user.bannerImageUrl)
        setDisplayImageUrl(user.displayImageUrl)
        setName(user.displayName)
        setBio(user.bio)
    }, [])

    const saveChanges = async (e) => {
        e.preventDefault()
        user.displayName = name
        user.bio = bio
        user.displayImageUrl = displayImageUrl
        user.bannerImageUrl = bannerImageUrl
        try {
            console.log(user)
            const response = await axios.patch('http://localhost:3002/api/users/' + user.username, user);
            console.log(response)
            changeEditProfile()
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleImageUpload = (event, isBanner) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64Image = reader.result;
        isBanner ? setBannerImageUrl(base64Image) : setDisplayImageUrl(base64Image) 
        console.log(base64Image);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(110, 117, 112, 0.5)",
        zIndex: 10,
        height: "100%",
        width: "100%",
        position: "absolute",
        left: 1,
        bottom: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "70%",
          width: "37.5%",
          backgroundColor: "white",
          border: "2px solid #1DA1F2",
          borderRadius: 5,
          position: "relative",
          left: "27.5%",
          top: 80,
        }}
      >
        <Box margin={2}>
          <IconButton sx={{ width: "10%" }} onClick={changeEditProfile}>
            <CancelIcon />
          </IconButton>
          <Button
            variant="contained"
            size="small"
            onClick={saveChanges}
            sx={{
              float: "right",
              borderRadius: 5,
              backgroundColor: "black",
              display: "flex",
            }}
          >
            Save
          </Button>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <strong>Edit Profile</strong>
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "25%",
            backgroundColor: "rgb(207, 217, 222)",
            marginBottom: 5,
          }}
        >
          <img src={bannerImageUrl} />
          <Box sx={{position: 'relative', top: '60%', left: '5%'}}>
          <Avatar
            src={displayImageUrl}
            sx={{
              width: 60,
              height: 60,
              border: "4px solid white",
            }}
          />
          <label htmlFor="image-upload" style={{position: 'relative', left: 22.5, bottom: 37.5, cursor: 'pointer'}}>
            <CloudUploadIcon />
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          </Box>
        </Box>
        <TextField
          sx={{ textAlign: "left", margin: 2 }}
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          sx={{ textAlign: "left", margin: 2 }}
          multiline
          label="Bio"
          rows={3}
          required
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default EditProfileComponent;
