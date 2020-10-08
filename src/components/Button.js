import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  border: "black";
  border-radius: 4px;
  padding: 1rem 3rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  outline: none;
  cursor: pointer;

  background: "gray";
  &:hover {
    background: "gray";
  }
`;

Button.propTypes = {};

function Button(props) {
  return (
    <div>
      {/* Button이 받아오는 props를 모두 StyledButton에 전달한다는 의미 */}
      <StyledButton type="submit">Submit</StyledButton>
    </div>
  );
}

export default Button;
