import React, { useState } from "react";
import CheckPlateBoxComponent from "./CheckPlateBoxComponent";

function CheckPlateComponent() {
  const [selected, setSelected] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  function handleChange(checked, number) {
    console.log(number);
    selected[number - 1] = checked;
    setSelected({ selected });
  }

  return (
    <div>
      <div className="number-plate-contents">
        {selected.map((select, index) => (
          <CheckPlateBoxComponent
            key={index}
            number={index + 1}
            selected={select}
            handleChange={(e) =>
              handleChange(e.target.selected, e.target.number)
            }
          />
        ))}
      </div>
      <button className="number-button">NumberPC</button>
    </div>
  );
}

export default CheckPlateComponent;
