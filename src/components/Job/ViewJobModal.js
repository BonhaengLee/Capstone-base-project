import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import * as dateFns from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
import UpdateJobModal from "./UpdateJobModal";
import { useHistory } from "react-router-dom";
import defaultImage from "../../assets/sampleImage.PNG";
import { db } from "../../firebase/config";
import { useEffect } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { firestore } from "../../firebase/config";
import "./jobModal.css";
// import asi from "../../assets/temp/assi.PNG";
// import don from "../../assets/temp/money.PNG";
// import pan from "../../assets/temp/pan.PNG";
// import dom from "../../assets/temp/dom.PNG";
// import da from "../../assets/temp/da.PNG";
// import gi from "../../assets/temp/gi.PNG";
// import sim from "../../assets/temp/sim.PNG";
// import mo from "../../assets/temp/mo.PNG";

export default (props) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updateJobModal, setUpdateJobModal] = useState(false);
  const [error, setError] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const history = useHistory();

  console.log("props.job.chatId", props.job.chatId);

  const closeModal = () => {
    setLoading(false);
    props.closeModal();
  };

  async function emailToID(email) {
    const snapshot = await db.ref("users").once("value");
    for (const key in snapshot.val()) {
      // skip loop if the property is from prototype
      if (!snapshot.val().hasOwnProperty(key)) continue;
      const obj = snapshot.val()[key];
      for (const prop in obj) {
        // skip loop if the property is from prototype
        if (!obj.hasOwnProperty(prop)) continue;
        if (prop === "email" && obj[prop] === email) return obj["uid"];
      }
    }
    return null;
  }

  function hist(chatID) {
    history.push("/chat/" + chatID);
  }

  const appKeyPress = async (e) => {
    setError(null);
    var senderID = currentUser.uid;
    if (inputVal) {
      try {
        console.log(inputVal);
        var receiverID = await emailToID(inputVal);
        console.log(receiverID);
        console.log(senderID);

        if (!receiverID) throw new Error("No friend found with that email 😕");
        if (receiverID === senderID)
          throw new Error("You can't text yourself 💩");

        await makeFriends(senderID, receiverID);
        console.log(receiverID);
        console.log(senderID);
        var chatID = chatIDGenerator(senderID, receiverID);
        console.log(chatID);

        hist(chatID);
        // history.push("/chat/" + chatID);
      } catch (error) {
        console.log(error.message);
        console.log("error");
        setError(error.message);
      }
    }
  };

  function moveOtherProfile(email) {
    history.push("/trader/" + email);
  }

  const keyPressMove = async (e) => {
    try {
      // const us = `${props.job.userId}_${props.job.userName}_${props.job.userPhoto}_${props.job.chatId}`;
      moveOtherProfile(props.job.chatId);
      // history.push("/chat/" + chatID);
      console.log(props.job.chatId);
    } catch (error) {
      console.log(error.message);
      console.log("error");
    }
  };

  async function makeFriends(currentUserID, friendID) {
    const currentUserObj = await (
      await db.ref(`users/${currentUserID}`).once("value")
    ).val();
    currentUserObj.chatID = chatIDGenerator(currentUserID, friendID);
    delete currentUserObj.friends; // deleting additional user property

    const friendObj = await (
      await db.ref(`users/${friendID}`).once("value")
    ).val();
    friendObj.chatID = chatIDGenerator(currentUserID, friendID);

    // friendObj db 추가시 post 제목, id 추가
    friendObj.post = props.job.title;
    friendObj.postId = props.job.postId;

    delete friendObj.friends; // deleting additional user property

    return (
      db.ref(`users/${currentUserID}/friends/${friendID}`).set(friendObj) &&
      db.ref(`users/${friendID}/friends/${currentUserID}`).set(currentUserObj)
    ); // Adding new Friend in both user's document
  }

  function chatIDGenerator(ID1, ID2) {
    if (ID1 < ID2) return `${ID1}_${ID2}`;
    else return `${ID2}_${ID1}`;
  }

  const [ports, setPorts] = useState([]);
  const getPorts = async () => {
    const req = await firestore
      .collection("portfolio")
      .where("userEmail", "==", props.job.userId)
      .get();
    const tempPorts = req.docs.map((port) => ({
      ...port.data(),
    }));
    setPorts(tempPorts);
  };
  const [scores, setScores] = useState([]);
  const getScores = async () => {
    const req = await firestore
      .collection("scores")
      .where("email", "==", props.job.userId)
      .get();
    const tempScs = req.docs.map((sc) => ({
      ...sc.data(),
    }));
    setScores(tempScs);
  };

  const now = scores["0"] === undefined ? 50 : scores["0"].st;

  const progressInstance = (
    <ProgressBar
      variant={"YOU_PICK_A_NAME"}
      className="progress-custom"
      min={0}
      max={99}
      now={now}
      label={`${now}cm`}
      style={{
        height: "50px",
        fontColor: "gray",
      }}
    />
  );

  // const skillImage = (skill) => {
  //   if (skill === "도면작업") {
  //     return <img src={dom} className="chip" />;
  //   } else if ((skill = "모형작업")) {
  //     return <img src={mo} className="chip" />;
  //   } else if ((skill = "다이어그램")) {
  //     return <img src={da} className="chip" />;
  //   } else if ((skill = "판넬작업")) {
  //     return <img src={pan} className="chip" />;
  //   } else if ((skill = "심부름")) {
  //     return <img src={sim} className="chip" />;
  //   } else {
  //     return <img src={gi} className="chip" />;
  //   }
  // };

  useEffect(() => {
    setInputVal(props.job.userId);
    (async () => {
      try {
        await getPorts();
        await getScores();
      } catch (err) {
        console.log("error in review");
      }
    })();
  }, []);

  console.log(props.job.userId);
  console.log(props.job.userPhoto);
  console.log(ports);
  console.log(scores);

  return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          &nbsp;
          <IconButton onClick={props.closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption" style={{ fontSize: "2px" }}>
              작성일 :{" "}
            </Typography>
            <Typography variant="body2">
              {props.job.postedOn &&
                dateFns.format(props.job.postedOn, "yyyy-MM-dd HH:MM")}
            </Typography>
          </Box>

          <Container>
            <Row>
              <Col xs="7">
                <img
                  src={
                    props.job.imageUrl !== null
                      ? props.job.imageUrl
                      : defaultImage
                  }
                  height="180px"
                  width="290px"
                  alt="projectImage"
                  style={{
                    borderRadius: 10,
                  }}
                />
              </Col>
              <Col xs="5">
                <Row>
                  <Col style={{ height: "55px" }}>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "18px",
                        fontFamily: "AppleSDGothicNeoEB.ttf",
                        fontWeight: "bold",
                      }}
                    >
                      [{props.job.location}]{props.job.title}
                    </Typography>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ height: "65px" }}>
                    <Grid>
                      {props.job.reward}
                      {/* {props.job.reward === "돈" ? (
                        <img
                          src={don} //defaultImage
                          className="chip"
                        />
                      ) : (
                        <img src={asi} className="chip" />
                      )} */}
                    </Grid>
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{
                      height: "50px",
                      marginTop: "10px",
                    }}
                  >
                    {props.job.userId !== currentUser.email && (
                      <Button
                        disabled={loading}
                        style={{
                          width: "150px",
                          backgroundColor: "#B9ACE0",
                          fontColor: "#fff",
                        }}
                      >
                        <Button
                          onClick={appKeyPress}
                          style={{ color: "B9ACE0" }}
                        >
                          쪽지 보내기
                        </Button>
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>

          <Box
            className={classes.info}
            display="flex"
            style={{ marginBottom: "30px" }}
          >
            <Typography variant="caption">
              -------------------------------------------------------------------------------
            </Typography>
          </Box>

          <Box className={classes.info}>
            <span>
              <Typography
                variant="caption"
                style={{
                  marginLeft: "20px",
                  marginBottom: "50px",
                  fontFamily: "NotoSansKR-Bold.otf",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                부엉이 정보
              </Typography>
            </span>
            <Container style={{ marginLeft: "-10px" }}>
              <Row>
                <Col xs="4">
                  <img
                    src={
                      props.job.userPhoto ? props.job.userPhoto : defaultImage
                    }
                    height="150px"
                    width="150px"
                    alt="profileImage"
                    style={{ borderRadius: 80 }}
                  />
                  <Typography
                    variant="body2"
                    style={{
                      marginBottom: "30px",
                      textAlign: "center",
                      marginTop: "20px",
                      fontWeight: 600,
                    }}
                  >
                    {props.job.userName}
                  </Typography>
                </Col>
                <Col xs="8">
                  <Container>
                    <Row>
                      <Col xs="12" style={{ height: "75px" }}>
                        <Typography
                          style={{
                            fontFamily: "NotoSansKR-Bold.otf",
                            fontWeight: "bold",
                          }}
                        >
                          소개
                          <br />
                          {ports["0"] &&
                            (ports["0"].intro === ""
                              ? "아직 작성되지 않았습니다."
                              : ports["0"].intro)}
                        </Typography>
                      </Col>
                      <Col
                        xs="12"
                        style={{ height: "75px", fontWeight: "bold" }}
                      >
                        <Typography
                          style={{
                            fontFamily: "NotoSansKR-Bold.otf",
                            fontWeight: "bold",
                          }}
                        >
                          매너 룰러
                        </Typography>
                        <Typography>{progressInstance}</Typography>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>

            {props.job.userId !== currentUser.email && (
              <Button
                display="flex"
                disableElevation
                disabled={loading}
                style={{ marginLeft: "380px" }}
              >
                <Button onClick={keyPressMove}>프로필 보러가기</Button>
              </Button>
            )}
          </Box>
          <Box
            className={classes.info}
            display="flex"
            style={{ marginBottom: "30px" }}
          >
            <Typography variant="caption">
              -------------------------------------------------------------------------------
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">작업실 위치 : </Typography>
            <Typography variant="body2" style={{ marginBottom: "50px" }}>
              {props.job.location}
            </Typography>
          </Box>

          <Box className={classes.info} display="flex">
            <Typography variant="caption">
              구하는 부엉이 어시 인원수 :{" "}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "50px" }}>
              {props.job.nOfPeople}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">부엉이 어시 성별 : </Typography>
            <Typography variant="body2" style={{ marginBottom: "50px" }}>
              {props.job.sex}
            </Typography>
          </Box>

          <Box className={classes.info} display="flex">
            <Typography variant="caption">프로젝트 설명 : </Typography>
            <Typography variant="body2" style={{ marginBottom: "50px" }}>
              {props.job.description}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">부엉이 어시 구하는 날 : </Typography>
            <Typography variant="body2" style={{ marginBottom: "50px" }}>
              {props.job.endDate}
            </Typography>
          </Box>
          <Box ml={0.5} style={{ marginBottom: "50px" }}>
            <Typography variant="caption">부엉이 어시가 할 일 : </Typography>
            <Grid container alignItems="center">
              {props.job.skills &&
                props.job.skills.map((skill) => (
                  <Grid item key={skill}>
                    {/* {skillImage(skill)} */}
                    {skill}
                  </Grid>
                ))}
            </Grid>
          </Box>

          <Box
            className={classes.info}
            display="flex"
            style={{ marginBottom: "30px" }}
          >
            <Typography variant="caption">
              부엉이 어시 시다경험 유무 :{" "}
            </Typography>
            <Typography variant="body2">{props.job.experience}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        {props.job.userId === currentUser.email ? (
          <Grid>
            <Button
              style={{ marginRight: "10px" }}
              variant="contained"
              onClick={() => setUpdateJobModal(true)}
            >
              수정
            </Button>
            <UpdateJobModal
              closeModal={() => setUpdateJobModal(false)}
              closeViewModal={props.closeModal}
              updateJobModal={updateJobModal}
              updateJob={props.updateJob}
              job={props.job}
            />
            <Button
              style={{ backgroundColor: "#F9D598" }}
              variant="contained"
              onClick={() => {
                if (window.confirm("정말로 삭제하시겠습니까?")) {
                  props.deleteJob(props.job);
                  closeModal();
                }
              }}
            >
              삭제
            </Button>
          </Grid>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  info: {
    "& > *": {
      margin: "4px",
    },
  },
}));
