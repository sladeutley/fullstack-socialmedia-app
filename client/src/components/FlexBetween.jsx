import { Box } from "@mui/material";
import { styled } from "@mui/system";

//this is a technique used if reusing css as a component
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;