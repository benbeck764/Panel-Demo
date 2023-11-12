import { PaletteOptions } from "@mui/material/styles";

const paletteBase: PaletteOptions = {
  common: {
    black: "#000000",
    white: "#FFFFFF",
  },
  grey: {
    50: "#f7f7f7",
    100: "#eeeeee",
    200: "#e2e2e2",
    300: "#d0d0d0",
    400: "#ababab",
    500: "#8a8a8a",
    600: "#636363",
    700: "#505050",
    800: "#323232",
    900: "#121212",
  },
  coolGrey: {
    50: "#f8f8f8",
    100: "#f1f1f1",
    200: "#e7e7e7",
    300: "#d6d6d6",
    400: "#b2b2b2",
    500: "#929292",
    600: "#6a6a6a",
    700: "#565656",
    800: "#383838",
    900: "#181818",
  },
};

export const getPalette = (): PaletteOptions => {
  return {
    ...paletteBase,
    mode: "light",
    background: {
      default: "#232323",
    },
    common: {
      white: "#FFFFFF",
      black: "#191414",
    },
    primary: {
      main: "#FFFFFF",
      light: "#3FAF51",
    },
    secondary: {
      main: "#191414",
      light: "#58B7ED",
      dark: "#C1C7CD",
    },
    action: {
      disabled: "#C1C7CD",
      focus: "#FF5519",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#ABABAB",
    },
    success: {
      main: "#00C853",
      dark: "#1B8031",
    },
    error: {
      main: "#B5121B",
    },
    warning: {
      main: "#E27800",
    },
    info: {
      main: "#000000",
    },
  };
};
