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
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: themeBase.palette.grey[800],
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: themeBase.palette.grey[800],
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          text: {
            "&.MuiButton-text": {
              "&:focus": {
                color: themeBase.palette?.action.focus,
              },
            },
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backdropFilter: `blur(4.5px) brightness(0.65)`,
          },
        },
      },
    },
  };
};
