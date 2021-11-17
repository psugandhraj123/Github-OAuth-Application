import React, { createContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RepoList from "./routes/RepoList";
import Login from "./routes/Login";
import { Action, InitialState, initialState, reducer } from "./store/reducer";
import RelayEnvironment from "./RelayEnvironment";
import { QueryRenderer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

const AppAllGitQuery = graphql`
  query AppAllGitQuery($count: Int!, $after: String) {
    viewer {
      login
      ...RepoList_viewer
    }
  }
`;

export const AuthContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>(undefined!);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Grid
        style={{
          backgroundImage: "linear-gradient(#ff8a00, #e52e71)",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                state.isLoggedIn ? (
                  <QueryRenderer
                    environment={RelayEnvironment}
                    variables={{ count: 5 }}
                    query={AppAllGitQuery}
                    render={({ error, props }: any) => {
                      if (error) {
                        return <div>{error.message}</div>;
                      } else if (props) {
                        return <RepoList viewer={props.viewer} />;
                      }
                      return (
                        <CircularProgress
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                          }}
                          color="inherit"
                        />
                      );
                    }}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Router>
      </Grid>
    </AuthContext.Provider>
  );
}

export default App;
