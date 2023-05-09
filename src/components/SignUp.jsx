import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    let item = { username, password };
    try {
      let result = await fetch("http://gtrac.in:8080/tracking/logindev", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization:
            "Basic " + window.btoa("netrackingnodeAPI:netrackingnodeAPI@#b00"),
        },
        body: JSON.stringify(item),
      });

      const data = await result.json();

      if (data.status === true) {
        localStorage.setItem("token-info", JSON.stringify(item));
        navigate("/dashboard");
      } else if (data.status === false) {
        setMessage(data.message);
      } else if (result?.status === 400 || result?.status === 401) {
        setMessage(data.details[0].message);
      }
    } catch (err) {
      console.log("error");
      if (err === 400) {
        setMessage("invalid");
      }
    }
  };

  console.log(username.length);

  return (
    <Box
      mt={10}
      ml={70}
      sx={{ border: "2px solid blue", borderRadius: "20px", width: "400px" }}>
      <Box sx={{ width: "400px", height: "250px", margin: "80px 0 0 80px" }}>
        <TextField
          label="Username"
          type="text"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setUsername(e.target.value)}
          helperText={
            username.length > 0 && username.length < 3
              ? "username must be more than two characters"
              : ""
          }
          error={username.length > 0 && username.length < 3}
        />
        <Box mt={5}>
          <TextField
            label="Password"
            type="password"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setPassword(e.target.value)}
            helperText={
              password.length > 0 && password.length < 3
                ? "password must be more than two characters"
                : ""
            }
            error={password.length > 0 && password.length < 3}
          />
        </Box>
        <Box mt={5} ml={8}>
          <Button variant="contained" onClick={Login}>
            Sign In
          </Button>
        </Box>
      </Box>
      {message !== "" && (
        <Typography
          sx={{ fontSize: "14px", marginLeft: "5px", marginBottom: "10px" }}>
          API Response : {message}
        </Typography>
      )}
    </Box>
  );
}
