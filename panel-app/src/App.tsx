import { FC } from "react";
import { Auth0ProviderOptions } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppContent from "./AppContent";
import { getTheme } from "./theme/theme";
import CustomThemeProvider from "@benbeck764/react-components/theme";
import { Auth0ProviderWithNavigate } from "./auth/Auth0ProviderWithNavigate";

const App: FC = () => {
  const theme = getTheme();

  const auth0ProviderProps: Auth0ProviderOptions = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN || "",
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || "",
    authorizationParams: {
      redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE || "",
    },
    useRefreshTokens: true,
    cacheLocation: "localstorage",
  };

  return (
    <CustomThemeProvider theme={theme}>
      <Router>
        <Auth0ProviderWithNavigate {...auth0ProviderProps}>
          <CssBaseline />
          <AppContent />
        </Auth0ProviderWithNavigate>
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
