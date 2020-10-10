import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Filterver3(props) {
  const onSubmit = (data) => {
    console.log(data);
  };

  const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    console.log("Checkbox: ", name, checked);

    return (
      <input type={type} name={name} checked={checked} onChange={onChange} />
    );
  };

  const [checkedItems, setCheckedItems] = useState({}); //plain object as state

  const handleChange = (event) => {
    // updating an object instead of a Map
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    console.log("checkedItems: ", checkedItems);
  }, [checkedItems]);

  const checkboxes_grade = [
    {
      name: "학년무관",
      key: "학년무관key",
      label: "학년무관label",
    },
    {
      name: "1학년",
      key: "1학년key",
      label: "1학년label",
    },
    {
      name: "2학년",
      key: "2학년key",
      label: "2학년label",
    },
    {
      name: "3학년",
      key: "3학년key",
      label: "3학년label",
    },
    {
      name: "4학년",
      key: "4학년key",
      label: "4학년label",
    },
    {
      name: "5학년",
      key: "5학년key",
      label: "5학년key",
    },
  ];
  const checkboxes_reward = [
    {
      name: "무관",
      key: "무관key",
      label: "무관label",
    },
    {
      name: "돈",
      key: "돈key",
      label: "돈label",
    },
    {
      name: "어시교환",
      key: "어시교환key",
      label: "어시교환label",
    },
  ];

  const checkboxes_todo = [
    {
      name: "모형작업",
      key: "모형작업key",
      label: "모형작업label",
    },
    {
      name: "판넬작업",
      key: "판넬작업key",
      label: "판넬작업label",
    },
    {
      name: "기타",
      key: "기타key",
      label: "기타label",
    },
  ];

  return (
    <div>
      <label>지역</label> <br />
      <select>
        <option>전국</option>
        <option>서울</option>
        <option>부산</option>
        <option>대구</option>
        <option>부산</option>
        <option>인천</option>
        <option>광주</option>
        <option>대전</option>
        <option>울산</option>
        <option>세종</option>
        <option>경기</option>
        <option>경남</option>
        <option>경북</option>
        <option>충남</option>
        <option>충북</option>
        <option>전남</option>
        <option>전북</option>
        <option>강원</option>
        <option>제주</option>
      </select>
      <div></div>
      <lable>학년{checkedItems["학년무관"]} </lable> <br />
      {checkboxes_grade.map((item) => (
        <label key={item.key}>
          {item.name}
          <Checkbox
            name={item.name}
            checked={checkedItems[item.name]}
            onChange={handleChange}
          />
        </label>
      ))}
      <div></div>
      <lable>대가설정{checkedItems["무관"]} </lable> <br />
      {checkboxes_reward.map((item) => (
        <label key={item.key}>
          {item.name}
          <Checkbox
            name={item.name}
            checked={checkedItems[item.name]}
            onChange={handleChange}
          />
        </label>
      ))}
      <div></div>
      <lable>어시 할일{checkedItems["모형작업"]} </lable> <br />
      {checkboxes_todo.map((item) => (
        <label key={item.key}>
          {item.name}
          <Checkbox
            name={item.name}
            checked={checkedItems[item.name]}
            onChange={handleChange}
          />
        </label>
      ))}
    </div>
  );
}

export default Filterver3;
