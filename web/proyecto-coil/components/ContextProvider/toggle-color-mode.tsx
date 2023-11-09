/* eslint-disable indent */
"use client";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../../context/color-mode-context";
import useMediaQuery from "@mui/material/useMediaQuery";
type Props = {
  children?: React.ReactNode;
};
export default function ToggleColorMode({ children }: Props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme(
        mode == "light"
          ? {
              palette: {
                mode: "light",
              },
            }
          : {
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
            }
      ),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
