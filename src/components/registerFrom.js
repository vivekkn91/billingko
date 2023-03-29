import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      axios
        .post("http://localhost:3001/api/register", {
          fullName: fullName,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          // TODO: handle successful registration
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error.response.data.message);
          // TODO: handle registration error
        });
    }
  };

  return (
    <div>
      <p style={{ fontSize: "17px", fontWeight: "600", color: "#604949" }}>
        Register for a new account
      </p>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="fullName"
          label="Full Name"
          variant="outlined"
          value={fullName}
          onChange={handleFullNameChange}
          required
        />
        <br /> <br />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <br /> <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="new-password"
          required
        />
        <br /> <br />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          autoComplete="new-password"
          required
        />
        <br /> <br />
        {errorMessage && (
          <p style={{ color: "red", fontWeight: "600" }}>{errorMessage}</p>
        )}
        <Button variant="contained" type="submit">
          Register
        </Button>
        <br /> <br />
        <p>
          Already have an account?{" "}
          <Link
            to={{
              pathname: "/",
            }}
          >
            Sign in
          </Link>
        </p>
      </Box>
    </div>
  );
}
