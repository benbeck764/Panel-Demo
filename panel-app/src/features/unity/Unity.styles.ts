import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledIFrameWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  height: `calc(100vh - ${theme.headerHeights?.xl}px - 8px)`
}));

export const StyledIFrame = styled("iframe")(() => ({
  border: "none",
  overflow: "hidden",
}));
