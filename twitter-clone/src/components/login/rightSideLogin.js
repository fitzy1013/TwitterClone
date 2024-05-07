import {
  Container,
  Icon,
  SvgIcon,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import { useNavigate } from "react-router";

const RightSide = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false)

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    // if using the sign-in form try to sign-in the user and then redirect to the main-dashboard
    // if using the sign-up add the user to the database if a valid user and then give a notification asking them to sign in and switch to sign in form and clear the form
    setError(null);
    e.preventDefault();
    if (
      username === "" ||
      password === "" ||
      (passwordConfirm === "" && !isSignInForm)
    ) {
      return setError("There are some missing fields");
    }

    if (!isSignInForm && passwordConfirm !== password) {
      return setError("Passwords Don't Match");
    }

    try {
      if (isSignInForm) {
        const response = await axios.post(
          "http://localhost:3002/api/users/login",
          { username, password }
        );

        if (response.status === 201) {
          // Set user session using react-auth-kit
          signIn({
            token: response.data.token,
            expiresIn: response.data.expiresIn,
            tokenType: "Bearer",
            authState: response.data.userInfo
          });

          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("username", response.data.userInfo.username);
          navigate("/");
        } else {
          setError("Invalid username or password");
        }
      } else {
        const response = await axios.post("http://localhost:3002/api/users", {
          username,
          password,
        });

        if (response.status === 201) {
            setOpen(true)
            setIsSignInForm(true)
        }
        else {
            setError("Failed to create Account")
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  const handleChangeFormType = () => {
    setIsSignInForm((current) => !current);
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TwitterIcon fontSize="large" sx={{ color: "#1DA1F2" }} />
        <Typography variant="h4" sx={{ marginTop: 4, color: "#1DA1F2" }}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column" }}
        >
          <TextField
            required
            id="username-input"
            value={username}
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            required
            id="password-input"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            sx={{ marginTop: 2 }}
          />
          {!isSignInForm && (
            <TextField
              required
              id="password-confirm-input"
              value={passwordConfirm}
              label="Confirm Password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              sx={{ marginTop: 2 }}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </Button>
          <Button color="primary" onClick={handleChangeFormType}>
            <strong>
              {isSignInForm
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </strong>
          </Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Account Succesfully Created! Now you can Sign In
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default RightSide;
