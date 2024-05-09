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
import FileBase64 from "react-file-base64";
import imageCompression from "browser-image-compression"
import imageType from 'image-type';

const EditProfileComponent = ({ changeEditProfile, user }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  console.log(displayImageUrl)

  useEffect(() => {
    setBannerImageUrl(user.bannerImageUrl);
    setDisplayImageUrl(user.displayImageUrl);
    setName(user.displayName);
    setBio(user.bio);
  }, []);

  async function handleFileUpload(event, isBannerImage) {
    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
  
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };
  
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      
      // Convert the compressed file to base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64Data = reader.result;
        if (isBannerImage) {
          setBannerImageUrl(base64Data);
        } else {
          setDisplayImageUrl(base64Data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }
  

  const saveChanges = async (e) => {
    e.preventDefault();
    user.displayName = name;
    user.bio = bio;
    user.displayImageUrl = displayImageUrl;
    user.bannerImageUrl = bannerImageUrl;
    console.log(user)
    try {
      console.log(user);
      const response = await axios.patch(
        "http://localhost:3002/api/users/" + user.username,
        user
      );
      console.log(response);
      changeEditProfile();
    } catch (err) {
      console.log(err.message);
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
              backgroundColor: "rgb(207, 217, 222)",
              height: "150px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Add your banner image source here */}
            <img
              src={bannerImageUrl}
              alt="Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Avatar
              src={displayImageUrl}
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
        <Box sx={{display: 'flex', flexDirection: 'row' , gap: 2, padding: 1, border: '1px double black', borderRadius: 5, marginLeft: 5, marginRight: 5, marginTop: 2, marginBottom: 1}}>
        <Typography variant="body1">
          Update Display Picture
        </Typography>
        <input type="file" accept="image/*" onChange={event => handleFileUpload(event, false)}/>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row' , gap: 2, padding: 1, border: '1px double black', borderRadius: 5, marginLeft: 5, marginRight: 5, marginTop: 2, marginBottom: 1}}>
        <Typography variant="body1">
          Update Banner Image
        </Typography>
        <input type="file" accept="image/*" onChange={event => handleFileUpload(event, true)}/>
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
