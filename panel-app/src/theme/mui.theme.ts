import { Theme, ThemeOptions } from "@mui/material/styles";

export const getMUITheme = (themeBaseOptions: ThemeOptions): ThemeOptions => {
  const themeBase = themeBaseOptions as Theme;

  return {
    ...themeBaseOptions,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            "*::-webkit-scrollbar": {
              width: "14px",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: themeBase.palette.coolGrey[500],
            },
            "*::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          },
          body: {
            overflowY: "scroll", // Scrollbar always exists to avoid flickering
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: themeBase.palette.coolGrey[900],
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: themeBase.palette.coolGrey[900],
          },
        },
      },
    },
  };
};
