import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { StyledHeaderContainer } from "./Header.styles";
import { AppRoutes, RouteName } from "../../../routing/common/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { AppButton, useBreakpoint } from "@benbeck764/react-components";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TrueAnomalyLogo from "../../../assets/True_Anomaly_Logo.jpg";
import { NavigationDrawer } from "./components/Navigation/NavigationDrawer";

export const Header: FC = () => {
  const {
    loginWithRedirect,
    logout: logoutWithRedirect,
    isAuthenticated,
  } = useAuth0();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint();

  const login = async (): Promise<void> => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
    });
  };

  const logout = (): void => {
    logoutWithRedirect({
      logoutParams: {
        returnTo: `${window.location.origin}${AppRoutes[RouteName.Site].path}`,
      },
    });
  };

  return (
    <>
      <StyledHeaderContainer>
        <AppBar color="primary" elevation={0}>
          <Toolbar
            variant="dense"
            sx={{
              px: breakpoint === "xl" ? 3 : `8px !important`,
            }}
          >
            <Grid container>
              <Grid
                item
                xs={8}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box>
                    <NavigationDrawer />
                  </Box>
                  <AppButton>
                    <Box
                      component="img"
                      src={TrueAnomalyLogo}
                      sx={{
                        py: 1,
                        height: (theme) => theme.headerHeights?.[breakpoint],
                      }}
                      onClick={() => {
                        if (pathname !== AppRoutes[RouteName.Site].path) {
                          navigate(AppRoutes[RouteName.Site].path);
                        }
                      }}
                    ></Box>
                  </AppButton>
                </Stack>
              </Grid>
              <Grid
                item
                xs={4}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                {!isAuthenticated && (
                  <AppButton
                    variant="text"
                    size="small"
                    color="primary"
                    onClick={() => login()}
                  >
                    Login
                  </AppButton>
                )}
                {isAuthenticated && (
                  <AppButton
                    variant="text"
                    size="small"
                    color="secondary"
                    onClick={() => logout()}
                  >
                    Logout
                  </AppButton>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </StyledHeaderContainer>
    </>
  );
};
