/* eslint-disable indent */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "@/context/color-mode-context";

type Anchor = "top" | "left" | "bottom" | "right";

const TemporaryDrawer = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = () => (
    <Box
      sx={{
        width: 230,
        paddingTop: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "flex-start",
        gap: "10px",
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
      role="presentation"
      onKeyDown={toggleDrawer("right", false)}
    >
      <CloseIcon
        onClick={toggleDrawer("right", false)}
        sx={{
          position: "absolute",
          left: "15px",
          top: "15px",
          fontSize: "24px",
          "&&:hover": {
            color: theme.palette.primary.main,
            textShadow: `0 0 5px ${alpha(
              theme.palette.primary.main,
              0.5
            )}, 0 0 15px ${theme.palette.primary.main}`,
          },
        }}
      />
      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>

      <Link
        href="/"
        style={{ textDecoration: "none" }}
        onClick={toggleDrawer("right", false)}
      >
        <Typography
          color={theme.palette.text.primary}
          sx={{
            transition: ".2s",
            "&&:hover": {
              color: theme.palette.primary.main,
              textShadow: `0 0 5px ${alpha(
                theme.palette.primary.main,
                0.5
              )}, 0 0 15px ${theme.palette.primary.main}`,
            },
          }}
        >
          Inicio
        </Typography>
      </Link>
      <Link
        href="/books"
        style={{ textDecoration: "none" }}
        onClick={toggleDrawer("right", false)}
      >
        <Typography
          color={theme.palette.text.primary}
          sx={{
            transition: ".2s",
            "&&:hover": {
              color: theme.palette.primary.main,
              textShadow: `0 0 5px ${alpha(
                theme.palette.primary.main,
                0.5
              )}, 0 0 15px ${theme.palette.primary.main}`,
            },
          }}
        >
          Biblioteca
        </Typography>
      </Link>
      <Link
        href="/register"
        onClick={toggleDrawer("right", false)}
        style={{ textDecoration: "none" }}
      >
        <Typography
          color={theme.palette.text.primary}
          sx={{
            transition: ".2s",
            "&&:hover": {
              color: theme.palette.primary.main,
              textShadow: `0 0 5px ${alpha(
                theme.palette.primary.main,
                0.5
              )}, 0 0 15px ${theme.palette.primary.main}`,
            },
          }}
        >
          Registrarse
        </Typography>
      </Link>
      <Link
        href="/login"
        onClick={toggleDrawer("right", false)}
        style={{ textDecoration: "none" }}
      >
        <Typography
          color={theme.palette.text.primary}
          sx={{
            transition: ".2s",
            "&&:hover": {
              color: theme.palette.primary.main,
              textShadow: `0 0 5px ${alpha(
                theme.palette.primary.main,
                0.5
              )}, 0 0 15px ${theme.palette.primary.main}`,
            },
          }}
        >
          Iniciar sesión
        </Typography>
      </Link>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer("right", true)}>
        <MenuIcon
          sx={{ fontSize: "2rem", color: theme.palette.text.primary }}
        />
      </Button>
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list()}
      </Drawer>
    </>
  );
};
export default TemporaryDrawer;
