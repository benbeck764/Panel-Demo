import AppCard from "@benbeck764/react-components/Card";
import Typography from "@mui/material/Typography";
import { FC, createRef } from "react";
import { StyledIframe } from "./Unity.styles";
import AppButton from "@benbeck764/react-components/Button";

const Unity: FC = () => {
  const iframeRef = createRef<HTMLIFrameElement>();
  // In your Unity project's JavaScript code
  // function receiveMessage(message) {
  //     console.log('Message from React:', message);
  //     // Handle the message as needed
  //   }

  //   // Add an event listener to listen for messages
  //   window.addEventListener('message', function (event) {
  //     if (event.data && event.data.type === 'unityMessage') {
  //       receiveMessage(event.data.message);
  //     }
  //   });

  // In your React component
  // const sendMessageToUnity = (message) => {
  //     const iframe = document.querySelector('iframe');
  //     iframe.contentWindow.postMessage({ type: 'reactMessage', message }, '*');
  //   };

  //   // Call the function when needed
  //   sendMessageToUnity('Hello from React!');

  const toggleFullscreen = (): void => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  return (
    <AppCard sx={{ p: 2 }}>
      <Typography variant="h3">Unity</Typography>
      <AppButton onClick={toggleFullscreen}>Toggle Fullscreen</AppButton>
      <StyledIframe
        ref={iframeRef}
        title="Unity WebGL"
        src="/WebGL_Build/index.html"
        width="1200"
        height="1000"
      />
    </AppCard>
  );
};

export default Unity;
