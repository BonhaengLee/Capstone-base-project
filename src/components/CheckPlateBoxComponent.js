import React, { useState } from "react";

function CheckBoxComponent(props) {
  const [check, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((check) => !check);
  };

  return (
    <div className="number-plate-box-contents">
      <div className="number-plate-box">
        <input
          type="checkbox"
          checked={props.selected}
          onChange={handleChange}
        />
        <p>{check ? "ON" : "OFF"}</p>
        <span>NumberPBC</span>
      </div>
    </div>
  );
}

export default CheckBoxComponent;
