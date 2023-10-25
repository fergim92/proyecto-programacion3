"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "rgba(125, 250, 125, 1)",
    },
    secondary: {
      main: "#10395c",
    },
    background: {
      default: "#121212",
      paper: "#191919",
    },
  },
};

const darkTheme = createTheme(themeOptions);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Theme({ children }: any) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
