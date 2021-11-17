import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { createPaginationContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { AuthContext } from "../App";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import RepoItem from "../components/RepoItem";

function RepoList(props: any) {
  const { state, dispatch } = useContext(AuthContext);
  const repos = props.viewer.repositories.edges
    ? props.viewer.repositories.edges
    : [];

  if (!state.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const LodeMore = () => {
    if (!props.relay.hasMore()) {
      console.log("Nothing more to load");
      return;
    } else if (props.relay.isLoading()) {
      console.log("Request is already pending");
      return;
    }
    props.relay.loadMore(5);
  };
  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      LodeMore();
    }
  };

  return (
    <React.Fragment>
      <AppBar position="static" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <GitHubIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Repositories
          </Typography>
          <Button color="inherit" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        style={{
          overflow: "auto",
          height: "100%",
          margin: "20px auto",
          paddingBottom: "100px",
        }}
        onScroll={handleScroll}
      >
        {repos.map(({ node }: any) => (
          <RepoItem key={node.id} repo={node} />
        ))}
      </Container>
    </React.Fragment>
  );
}

export default createPaginationContainer(
  RepoList,
  {
    viewer: graphql`
      fragment RepoList_viewer on User {
        repositories(
          first: $count
          after: $after
          orderBy: { field: CREATED_AT, direction: DESC }
        ) @connection(key: "RepoList_repositories") {
          edges {
            cursor
            node {
              ...RepoItem_repo
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    query: graphql`
      query RepoListForwardQuery($count: Int!, $after: String) {
        viewer {
          login
          ...RepoList_viewer
        }
      }
    `,
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.repositories;
    },
    getFragmentVariables(previousVariables, totalCount) {
      return { ...previousVariables, count: totalCount };
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        count: paginationInfo.count,
        after: paginationInfo.cursor,
      };
    },
  }
);
