import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import { Grid, Paper, Link, CircularProgress } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id } = state;
  const redirect_uri = window.location.href;

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, "", newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1],
        redirect_uri,
      };

      const proxy_url = state.proxy_url;
      console.log(proxy_url);

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then(({ access_token }) => {
          dispatch({
            type: "LOGIN",
            payload: { access_token, isLoggedIn: true },
          });
        })
        .catch((error) => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed",
          });
        });
    }
  }, [state, dispatch, data, redirect_uri]);

  if (state.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Paper
      elevation={15}
      style={{
        padding: 20,
        height: 400,
        width: 400,
        margin: "200px auto",
        background: "white",
      }}
    >
      <Grid textAlign="center" style={{ width: "100%" }}>
        <h1>Welcome</h1>
        <h2 style={{ marginTop: 100 }}>Access your github here</h2>
        <span>{data.errorMessage}</span>

        {data.isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Link
            style={{
              textDecoration: "none",
              padding: "15px 60px",
              border: "1px solid rgb(100, 100, 100)",
              borderRadius: 5,
              backgroundColor: "rgba(250, 250, 250,0.6)",
              color: "black",
              fontSize: 20,
            }}
            href={`https://github.com/login/oauth/authorize?scope=user%20repo&client_id=${client_id}&redirect_uri=${redirect_uri}`}
            onClick={() => {
              setData({ ...data, errorMessage: "" });
            }}
          >
            <span>Login with GitHub</span>
            <GitHubIcon style={{ marginLeft: 6, marginTop: 100 }} />
          </Link>
        )}
      </Grid>
    </Paper>
  );
}
