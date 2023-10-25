/* eslint-disable indent */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

type Anchor = "top" | "left" | "bottom" | "right";

const TemporaryDrawer = () => {
  const theme = useTheme();
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
            textShadow:
              "0 0 5px rgba(125, 225, 125, 0.5), 0 0 15px rgba(125, 250, 125, 1)",
          },
        }}
      />
      <Link
        href="/"
        style={{ textDecoration: "none" }}
        onClick={toggleDrawer("right", false)}
      >
        <Typography
          sx={{
            color: theme.palette.text.primary,
            padding: "5px 20px",
            textDecoration: "none",
            transition: ".2s",
            "&&:hover": {
              color: theme.palette.primary.main,
              textShadow:
                "0 0 5px rgba(125, 225, 125, 0.5), 0 0 15px rgba(125, 250, 125, 1)",
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
          sx={{
            color: theme.palette.text.primary,
            padding: "5px 20px",
            textDecoration: "none",
            transition: ".2s",
            "&&:hover": {
              color: theme.palette.primary.main,
              textShadow:
                "0 0 5px rgba(125, 225, 125, 0.5), 0 0 15px rgba(125, 250, 125, 1)",
            },
          }}
        >
          Biblioteca
        </Typography>
      </Link>
      <Link href="/register" onClick={toggleDrawer("right", false)}>
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.text.primary,
            borderColor: theme.palette.text.primary,
            "&&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Registrarse
        </Button>
      </Link>
      <Link href="/login" onClick={toggleDrawer("right", false)}>
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.text.primary,
            borderColor: theme.palette.text.primary,
            "&&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Iniciar sesión
        </Button>
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
