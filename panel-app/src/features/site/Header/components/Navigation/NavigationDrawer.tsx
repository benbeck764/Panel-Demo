import { FC, Fragment, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  NavMenuConfig,
  NavMenuOptions,
  NavigationOptionVariant,
} from "./NavigationDrawer.props";
import { useLocation, useNavigate } from "react-router-dom";
import AppDrawer from "@benbeck764/react-components/Drawer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AppDropdown from "@benbeck764/react-components/Dropdown";
import Typography from "@mui/material/Typography";
import { AppMenuItem } from "@benbeck764/react-components/Menu";
import { Theme } from "@mui/material/styles";
import { AppRoutes, RouteName } from "../../../../../routing/common/routes";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import { AppLink } from "./AppLink";

export const NavigationDrawer: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [forcedToggleState, setForcedToggleState] = useState<
    boolean | undefined
  >(undefined);

  const handleClickOption = ({
    navigationAction,
    navigationRoute,
  }: NavMenuOptions) => {
    setForcedToggleState(false);
    setOpen(false);

    if (pathname !== navigationRoute) {
      if (navigationRoute) navigate(navigationRoute);
      else {
        if (navigationAction) navigationAction();
      }
    }
  };

  const navigationConfiguration: NavMenuConfig[] = [
    {
      label: "Unity",
      variant: NavigationOptionVariant.Button,
      navigationRoute: AppRoutes[RouteName.Unity].path,
      icon: (
        <SatelliteAltIcon
          sx={{
            fontSize: "32px",
            color: (theme) => theme.palette.action.focus,
          }}
        />
      ),
    },
    {
      label: "Dashboard",
      variant: NavigationOptionVariant.Button,
      navigationRoute: AppRoutes[RouteName.Dashboard].path,
      icon: (
        <BarChartIcon
          sx={{
            fontSize: "32px",
            color: (theme) => theme.palette.action.focus,
          }}
        />
      ),
    },
  ];

  const handleClick = (option: NavMenuOptions) => {
    if (option.disabled) return;
    handleClickOption(option);
  };

  const handleButtonVariantClick = (config: NavMenuConfig) => () => {
    if (config.disabled) return;
    handleClickOption(config);
  };

  return (
    <AppDrawer
      mode="panel"
      forcedToggleState={forcedToggleState}
      drawerProps={{ anchor: "left", onClose: () => setOpen(false) }}
      onDrawerOpen={() => {
        setForcedToggleState(undefined);
        setOpen(true);
      }}
      panelSx={{
        pt: 1,
        px: 0,
        width: 300,
        overflowY: "hidden",
        height: "100%",
      }}
      buttonProps={{
        variant: "text",
        disableRipple: true,
        disableElevation: true,
        sx: {
          color: (theme) => theme.palette.common.black,
          minWidth: 30,
          transition: `transform 0.25s cubic-bezier(${
            open ? "0.215, 0.61, 0.355, 1" : "0.55, 0.055, 0.675, 0.19"
          }) ${open ? "0.12s" : "0s"}`,
          transform: `rotate(${open ? "180deg" : "0deg"})`,
        },
        children: <MenuIcon />,
      }}
    >
      <Stack direction="column" justifyContent="space-between" height="100%">
        <Box>
          <Box sx={{ overflowY: "scroll", pl: 1.5, py: 1 }}>
            {navigationConfiguration.map(
              (config: NavMenuConfig, index: number) => (
                <Fragment key={index}>
                  {config.variant === NavigationOptionVariant.Menu ? (
                    <AppDropdown
                      variant="header"
                      hideCaret={(config.menuItems?.length ?? 0) <= 0}
                      disabled={config.disabled}
                      renderClosed={
                        pathname === "/" ||
                        !config.menuItems.some((mi: NavMenuOptions) =>
                          mi.navigationRoute?.startsWith(pathname)
                        )
                      }
                      headerBoxSx={{
                        padding: "8px 8px",
                        margin: "0px",
                        ...(config.disabled
                          ? {}
                          : {
                              "&:hover": {
                                backgroundColor: (theme) =>
                                  theme.palette.coolGrey[100],
                              },
                              "&:focus": {
                                backgroundColor: (theme) =>
                                  theme.palette.coolGrey[100],
                                outline: "none",
                              },
                            }),
                      }}
                      title={
                        <Stack
                          direction="row"
                          gap={1}
                          alignItems="center"
                          justifyContent="flex-start"
                        >
                          <Box
                            sx={{
                              "&.MuiSvgIcon-root": {
                                color: (theme) => theme.palette.primary.main,
                              },
                            }}
                          >
                            {config?.icon}
                          </Box>
                          <Typography
                            key={index}
                            variant="paragraphBold"
                            sx={{
                              color: (theme) =>
                                config.disabled
                                  ? theme.palette.coolGrey[200]
                                  : theme.palette.primary.main,
                              "&:hover": {
                                color: (theme) => theme.palette.primary.dark,
                              },
                            }}
                          >
                            {config.label}
                          </Typography>
                        </Stack>
                      }
                    >
                      <Box sx={{ width: "100%" }}>
                        {config.menuItems?.map(
                          (option: NavMenuOptions, index: number) => (
                            <AppMenuItem
                              key={index}
                              sx={{ pl: 4 }}
                              disabled={option.disabled}
                              onSelect={() => handleClick(option)}
                            >
                              <Typography
                                variant="paragraphBold"
                                sx={
                                  option.disabled
                                    ? {
                                        color: (theme: Theme) =>
                                          theme.palette.coolGrey[200],
                                        ...(option.childOption && {
                                          pl: (theme: Theme) =>
                                            theme.spacing(2),
                                          fontWeight: 400,
                                        }),
                                      }
                                    : {
                                        color: (theme) =>
                                          theme.palette.common.white,
                                        "&:hover": {
                                          color: (theme) =>
                                            theme.palette.primary.dark,
                                        },
                                        ...(option.childOption && {
                                          pl: (theme: Theme) =>
                                            theme.spacing(2),
                                          fontWeight: 400,
                                        }),
                                      }
                                }
                              >
                                {option.label}
                              </Typography>
                            </AppMenuItem>
                          )
                        )}
                      </Box>
                    </AppDropdown>
                  ) : (
                    <AppLink to={config.navigationRoute ?? ""}>
                      <AppMenuItem
                        sx={{
                          "&:hover": {
                            backgroundColor: (theme) => theme.palette.grey[700],
                          },
                          width: "100%",
                          py: 1.25,
                        }}
                        onSelect={handleButtonVariantClick(config)}
                      >
                        <Stack direction="row" alignItems="center" gap={1.5}>
                          {config.icon && config.icon}
                          <Typography
                            sx={{
                              color: (theme) => theme.palette.common.white,
                            }}
                            variant="paragraphLarge"
                            color="primary"
                          >
                            {config.label}
                          </Typography>
                        </Stack>
                      </AppMenuItem>
                    </AppLink>
                  )}
                </Fragment>
              )
            )}
          </Box>
        </Box>
      </Stack>
    </AppDrawer>
  );
};
