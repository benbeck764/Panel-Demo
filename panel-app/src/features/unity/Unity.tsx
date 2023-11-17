//import { useAuth0 } from "@auth0/auth0-react";
import AppButton from "@benbeck764/react-components/Button";
import Box from "@mui/material/Box";
import { FC, createRef } from "react";
import { StyledIframe } from "./Unity.styles";
import Stack from "@mui/material/Stack";

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
    <Box>
      <Stack direction="row" justifyContent="flex-end">
        <AppButton onClick={toggleFullscreen}>Toggle Fullscreen</AppButton>
      </Stack>
      <Box width="100%" height="100%">
        <StyledIframe
          ref={iframeRef}
          title="Unity WebGL"
          src="/WebGL_Build/index.html"
          width="100%"
          height="1000"
          scrolling="no"
          seamless={true}
          allowFullScreen={true}
        />
      </Box>
    </Box>
  );
};

export default Unity;
