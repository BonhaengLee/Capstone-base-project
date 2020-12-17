import React from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import defaultImage from "../../assets/sampleImage.PNG";
import { Col, Row, Container } from "react-bootstrap";

export default (props) => {
  const classes = useStyles();

  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  }

  return (
    <Box
      m={2}
      p={2}
      className={classes.wrapper}
      style={{
        marginTop: "50px",

        backgroundColor: "#fff",
        borderRadius: 20,
        height: "400px",
      }}
      onClick={props.open}
    >
      <Grid container>
        <Grid item container fullWidth>
          <img
            src={props.imageUrl !== null ? props.imageUrl : defaultImage}
            height="200px"
            width="355px"
            alt="testA"
            style={{ borderRadius: 10 }}
          ></img>
        </Grid>

        <Container style={{ marginLeft: "-10px" }}>
          <Row>
            <Col xs="3">
              <Grid
                item
                container
                fullWidth
                style={{
                  marginTop: "10px",
                }}
              >
                <img
                  src={
                    props.userPhoto !== null ? props.userPhoto : defaultImage
                  }
                  height="85px"
                  width="85px"
                  alt="testA"
                  style={{ borderRadius: 100 }}
                ></img>
              </Grid>
            </Col>
            <Col xs="9">
              <Grid
                item
                container
                fullWidth
                style={{
                  marginTop: "10px",
                  alignItem: "center",
                  marginleft: "1px",
                }}
              >
                <Typography
                  className={classes.locationName}
                  variant="subtitle2"
                >
                  {props.location}
                </Typography>
                <Typography variant="subtitle1" style={{ marginTop: "2px" }}>
                  &nbsp;&nbsp;{props.title}
                </Typography>
              </Grid>
              <Grid
                item
                container
                fullWidth
                style={{ marginTop: "10px", marginLeft: "-4px" }}
              >
                {props.skills.map((skill) => (
                  <Grid key={skill} className={classes.skillChip} item>
                    {skill}
                  </Grid>
                ))}
              </Grid>
            </Col>
          </Row>
        </Container>

        <Grid item container fullWidth style={{ marginTop: "10px" }}>
          <Grid item>
            <Typography variant="captain">
              {/* {differenceInMinutes(Date.now(), props.job.postedOn)} min ago |{" "} */}
              {timeForToday(props.postedOn)} | {props.type} | {props.sex} |
              {props.reward}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container fullWidth style={{ marginTop: "10px" }}>
          <Grid item>
            <Typography
              variant="captain"
              style={{ fontWeight: 550, color: "#808080" }}
            ></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    cursor: "pointer",
    height: "350px",
    borderRadius: "10",

    "&:hover": {
      boxShadow: "0px 25px 25px rgba(0,0,0,0.1)",
      borderLeft: "1px solid " + `${theme.palette.mainColor.main}`,
    },
  },
  locationName: {
    fontSize: "13.5px",
    backgroundColor: "#e1bee7",
    padding: theme.spacing(0.75),
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: 600,
  },
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "9.5px",
    borderRadius: "5px",
    transition: ".3s",
    fontWeight: 600,
    backgroundColor: theme.palette.mainColor.main,
    color: "#fff",
  },
}));
