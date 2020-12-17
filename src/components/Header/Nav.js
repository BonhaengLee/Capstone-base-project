import { firestore } from "../../firebase/config";
import React, { lazy, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.PNG";
import { AppBar, Button, IconButton, Paper, Toolbar } from "@material-ui/core";
import NavSearchBar from "../SearchBar/NavSearchBar";

const UserIcon = lazy(() => import("../../auth/UserIcon"));
const Logout = lazy(() => import("../../auth/Logout"));

export default function Nav() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [currentUser]);

  return (
    <div>
      <AppBar
        className="navbar navbar-expand-sm navbar-light bg-transparent"
        style={{ flexDirection: "row" }}
      >
        <Toolbar>
          <IconButton>
            <a
              href="/"
              style={{
                color: "#7563A7",
                fontWeight: "500",
              }}
            >
              <img
                src={logo}
                width="300"
                height="75"
                alt="testA"
                style={{}}
              ></img>
            </a>
          </IconButton>
          <Button>
            <a
              href="/talent"
              Name="talent"
              style={{
                color: "#7563A7",
                fontWeight: "500",
              }}
            />
          </Button>
          <Button
            variant="outline-light"
            style={{ marginRight: "5px", fontsize: "30px" }}
          >
            <Link
              to={"/talent"}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              재능교환
            </Link>
          </Button>

          {currentUser ? null : (
            <NavSearchBar fetchJobs={fetchJobs} filterSelect={false} />
          )}

          {currentUser ? null : (
            <Button variant="outline-light" style={{ marginRight: "5px" }}>
              <Link
                to={"/login-register"}
                style={{ textDecoration: "none", color: "#fff", fontSize: 22 }}
              >
                로그인/회원가입
              </Link>
            </Button>
          )}
          {currentUser ? (
            <Button variant="outline-light" style={{ marginRight: "5px" }}>
              <Link
                to={"/chat"}
                style={{ textDecoration: "none", color: "#7563A7" }}
              >
                쪽지함
              </Link>
            </Button>
          ) : null}
        </Toolbar>
        {currentUser ? (
          <Toolbar
            style={{
              flexDirection: "row",
            }}
          >
            <Paper
              style={{
                width: "120px",
                marginRight: "10px",
                backgroundColor: "transparent",
              }}
            >
              <UserIcon />
            </Paper>
            <Paper
              style={{
                width: "120px",
                marginRight: "10px",
                backgroundColor: "transparent",
              }}
            >
              <Logout />
            </Paper>
          </Toolbar>
        ) : null}
      </AppBar>
    </div>
  );
}
