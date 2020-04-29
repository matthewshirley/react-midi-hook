import React from "react";
import styled from "styled-components";
import { color, border, layout, space, typography } from "styled-system";

const StyledButton = styled.button`
  display: inline-block;
  cursor: pointer;
  text-transform: capitalize;

  ${color}
  ${space}
  ${border}
  ${layout}
  ${typography}
`;

export default function StartButton({ initialize, ...props }) {
  return (
    <StyledButton onClick={initialize} {...props}>
      Connect Devices
    </StyledButton>
  );
}

StartButton.defaultProps = {
  my: 3,
  width: "25%",
  fontSize: 2,
  fontWeight: "bold",
  bg: "green",
  color: "white",
  height: "48px",
  lineHeight: "48px",
  borderStyle: "solid",
  borderWidth: "1px",
  textAlign: "center",
  verticalAlign: "middle",
};
