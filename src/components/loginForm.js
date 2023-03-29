import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const { counterId, password } = event.target.elements;
    const data = {
      email: counterId.value,
      password: password.value,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        data
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/dashbord");
      // window.location.href = "/#/dashbord";
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div>
      <p style={{ fontSize: "17px", fontWeight: "600", color: "#604949" }}>
        Login for checkout counter
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
        <TextField id="counterId" label="Counter ID" variant="outlined" />
        <br /> <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <br /> <br />
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        <Button type="submit" variant="contained">
          Sign in
        </Button>
        <br /> <br />
        <p>
          Don't have an account?{" "}
          <Link
            to={{
              pathname: "/register",
            }}
          >
            Register
          </Link>
        </p>
      </Box>
    </div>
  );
}
