import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import { CircularProgress } from "@material-ui/core";
import Nav from "./components/Header/Nav";
import "./styles.css";
import styled from "styled-components";


const UpdateProfilePage = lazy(() => import("./pages/UpdateProfile.page"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword.page"));
const JobListsPage = lazy(() => import("./JobLists"));
// const SignupPage = lazy(() => import("./pages/[r]Signup.page"));
// const LoginPage = lazy(() => import("./pages/Login.page"));
const LoginRegisterPage = lazy(() => import("./pages/LoginRegister"));
const HomePage = lazy(() => import("./pages/Home.page"));
const NoMatchPage = lazy(() => import("./pages/NoMatch.page"));
const Chatlist = lazy(() => import("./pages/Chatlist"));
const Chat = lazy(() => import("./pages/Chat"));

function App(props) {
  return (
    <Container>
    <div style={{ flex: 1, flexDirection: "flex-start" }}>
      <Suspense
        fallback={
          <div>
            <CircularProgress />
          </div>
        }
      >
        <Nav />
        <div>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={JobListsPage} />
              <PrivateRoute
                path="/update-profile"
                component={UpdateProfilePage}
              />
              <Route path="/login-register" component={LoginRegisterPage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route path="/home" component={HomePage} />
              <PrivateRoute path="/talent" component={JobListsPage} />

              <PrivateRoute exact path="/chat" component={Chatlist} />
              <PrivateRoute path="/chat/:chatID" component={Chat} />

              <Route component={NoMatchPage} />
            </Switch>
          </AuthProvider>
        </div>
      </Suspense>
    </div>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background:url(https://ifh.cc/g/n77edK.jpg/1029x4000);
  background-size: cover;
`;

export default App;
