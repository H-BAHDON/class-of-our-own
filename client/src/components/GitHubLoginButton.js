import React from "react";
import { Button, styled, keyframes } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
// Animation for the button
const pulsate = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;
const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #333333 30%, #1B1B1B 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(128, 128, 128, 0.3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  "&:hover": {
    animation: `${pulsate} 1s forwards`,
  },
});
const GitHubLoginButton = ({ onClick }) => {
  return (
    <StyledButton startIcon={<GitHubIcon />} onClick={onClick}>
      Login with GitHub
    </StyledButton>
  );
};
export default GitHubLoginButton;
