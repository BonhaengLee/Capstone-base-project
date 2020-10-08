import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

Profile.propTypes = {};

const ptypelabels = ["학교과제", "회사과제"];
const todolabels = [
  "모형제작",
  "판넬제작",
  "다이어그램",
  "도면작업",
  "심부름",
  "기타업무",
];
const genderlabels = ["여성", "남성", "무관"];
const toolslabels = ["스케치업..."];
const explabels = ["있다", "없다", "무관"];

function Profile(props) {
  const [state, setState] = useState({
    title: "",
    school: "",
    location: "",
    description: "",
    image: "",
    intro: "",
    ptype1: true,
    ptype2: true,
    todo1: true,
    todo2: true,
    todo3: true,
    todo4: true,
    todo5: true,
    todo6: true,
    gender1: true,
    gender2: true,
    gender3: true,
    headcount: 0,
    tools1: true,
    tools2: true,
    exp1: true,
    exp2: true,
    exp3: true,
    comment: "",
  });

  // // index 번째 체크 상태를 반전시킨다
  // const handleCheckClick = (idx) => {
  //   setState((checks) => checks.map((c, i) => (i === idx ? !c : c)));
  // };
  // const isAllChecked = state.every((x) => x);

  return (
    <form
      id="addPlayerFrm"
      onSubmit={function (event) {
        console.log(event.target.title.value, event.target.school.value);
      }}
    >
      <H>부엉이 구하러 가기</H>
      <div>Title</div>
      <Tinput
        type="text"
        name="title"
        value={state.title}
        onChange={(e) => {
          setState({ ...state, title: e.target.value });
          props.toutput(state.title);
        }}
      />
      <div>school</div>
      <Tinput
        type="text"
        name="school"
        value={state.school}
        onChange={(e) => {
          setState({ ...state, school: e.target.value });
          props.toutput(state.school);
        }}
      />
      <div>location</div>
      <Tinput
        type="text"
        value={state.location}
        onChange={(e) => {
          setState({ ...state, location: e.target.value });
          props.toutput(state.location);
        }}
      />
      <div>description</div>
      <Tinput
        type="text"
        value={state.description}
        onChange={(e) => {
          setState({ ...state, description: e.target.value });
          props.toutput(state.description);
        }}
      />
      <div>image</div>
      <Tinput
        type="text"
        value={state.image}
        onChange={(e) => {
          setState({ ...state, image: e.target.value });
          props.toutput(state.image);
        }}
      />
      <div>intro</div>
      <Tinput
        type="text"
        value={state.intro}
        onChange={(e) => {
          setState({ ...state, intro: e.target.value });
          props.toutput(state.intro);
        }}
      />

      <P>
        <div>ptype</div>
        <Ul>
          {ptypelabels.map((label, idx) => (
            <Li key={idx}>
              <label>
                <input
                  type="checkbox"
                  checked={state[idx + 6]}
                  onChange={(e) => {
                    if (idx === 0) {
                      setState({
                        ...state,
                        ptype1: !state.ptype1,
                      });
                      props.output(idx, state.ptype1); // props를 통해 전달받은 부모 메서드에 변수를 태워 보냄
                    } else if (idx === 1) {
                      setState({
                        ...state,
                        ptype2: !state.ptype2,
                      });
                      props.output(idx, state.ptype2);
                    }
                  }}
                />

                {label}
              </label>
            </Li>
          ))}
        </Ul>
      </P>

      <P>
        <div>todo</div>
        <Ul>
          {todolabels.map((label, idx) => (
            <Li key={idx}>
              <label>
                <input
                  type="checkbox"
                  checked={state[idx + 8]}
                  onChange={(e) => {
                    if (idx === 0) {
                      setState({
                        ...state,
                        todo1: !state.todo1,
                      });
                      props.output(idx, state.todo1); // props를 통해 전달받은 부모 메서드에 변수를 태워 보냄
                    } else if (idx === 1) {
                      setState({
                        ...state,
                        todo2: !state.todo2,
                      });
                      props.output(idx, state.todo2);
                    } else if (idx === 2) {
                      setState({
                        ...state,
                        todo3: !state.todo3,
                      });
                      props.output(idx, state.todo3);
                    } else if (idx === 3) {
                      setState({
                        ...state,
                        todo4: !state.todo4,
                      });
                      props.output(idx, state.todo4);
                    } else if (idx === 4) {
                      setState({
                        ...state,
                        todo5: !state.todo5,
                      });
                      props.output(idx, state.todo5);
                    } else if (idx === 5) {
                      setState({
                        ...state,
                        todo6: !state.todo6,
                      });
                      props.output(idx, state.todo6);
                    }
                  }}
                />
                {label}
              </label>
            </Li>
          ))}
        </Ul>
      </P>

      <P>
        <div>gender</div>
        <Ul>
          {genderlabels.map((label, idx) => (
            <Li key={idx}>
              <label>
                <input
                  type="checkbox"
                  checked={state[idx + 14]}
                  onChange={(e) => {
                    if (idx === 0) {
                      setState({
                        ...state,
                        gender1: !state.gender1,
                      });
                      props.output(idx, state.gender1); // props를 통해 전달받은 부모 메서드에 변수를 태워 보냄
                    } else if (idx === 1) {
                      setState({
                        ...state,
                        gender2: !state.gender2,
                      });
                      props.output(idx, state.gender2);
                    } else if (idx === 2) {
                      setState({
                        ...state,
                        ptype2: !state.gender3,
                      });
                      props.output(idx, state.gender3);
                    }
                  }}
                />
                {label}
              </label>
            </Li>
          ))}
        </Ul>
      </P>

      <P>
        <div>headcount</div>
        <input
          type="number"
          value={state.headcount}
          onChange={(e) => {
            setState({ ...state, headcount: e.target.value });
            props.toutput(state.headcount);
          }}
        />
      </P>
      <P>
        <div>tools</div>
        <Ul>
          {toolslabels.map((label, idx) => (
            <Li key={idx}>
              <label>
                <input
                  type="checkbox"
                  checked={state[idx + 17]}
                  onChange={(e) => {
                    if (idx === 0) {
                      setState({
                        ...state,
                        tools1: !state.tools1,
                      });
                      props.output(idx, state.tools1); // props를 통해 전달받은 부모 메서드에 변수를 태워 보냄
                    } else if (idx === 1) {
                      setState({
                        ...state,
                        tools2: !state.tools2,
                      });
                      props.output(idx, state.tools2);
                    }
                  }}
                />
                {label}
              </label>
            </Li>
          ))}
        </Ul>
      </P>

      <P>
        <div>exp</div>
        <Ul>
          {explabels.map((label, idx) => (
            <Li key={idx}>
              <label>
                <input
                  type="checkbox"
                  checked={state[idx + 19]}
                  onChange={(e) => {
                    if (idx === 0) {
                      setState({
                        ...state,
                        exp1: !state.exp1,
                      });
                      props.output(idx, state.exp1); // props를 통해 전달받은 부모 메서드에 변수를 태워 보냄
                    } else if (idx === 1) {
                      setState({
                        ...state,
                        exp2: !state.exp2,
                      });
                      props.output(idx, state.exp2);
                    } else if (idx === 2) {
                      setState({
                        ...state,
                        exp3: !state.exp3,
                      });
                      props.output(idx, state.exp3);
                    }
                  }}
                />
                {label}
              </label>
            </Li>
          ))}
        </Ul>
      </P>

      <P>
        <div>comment</div>
        <Tinput
          type="text"
          value={state.comment}
          onChange={(e) => {
            setState({ ...state, comment: e.target.value });
            props.toutput(state.comment);
          }}
        />
      </P>

      <P>
        <input type="submit" value="구하러 가기"></input>
      </P>
    </form>
  );
}

const H = styled.header`
  font-size: 20px;
  text-align: center;
  padding: 50px;
`;

const P = styled.div`
  height: 100px;
  weight: 200px;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 10px;
`;

const Li = styled.li`
  float: left;
  margin: 10px;
`;

const Tinput = styled.input`
  width: 600px;
  height: 50px;
`;

export default Profile;
