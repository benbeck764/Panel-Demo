import AppButton from "@benbeck764/react-components/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, createRef } from "react";
import { StyledIFrame, StyledIFrameWrapper } from "./Unity.styles";

const Unity: FC = () => {
  const iframeRef = createRef<HTMLIFrameElement>();

  const toggleFullscreen = (): void => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  return (
    <Box position="relative">
      <StyledIFrameWrapper>
        <StyledIFrame
          ref={iframeRef}
          title="Unity WebGL"
          src="/WebGL_Build/index.html"
          width="100%"
          height="100%"
          scrolling="no"
          seamless={true}
          allowFullScreen={true}
        />
      </StyledIFrameWrapper>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          width: "100%",
        }}
        p={2}
      >
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">Testing Overlay</Typography>
          <AppButton onClick={toggleFullscreen}>Toggle Fullscreen</AppButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default Unity;
