/* eslint-disable indent */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

type Anchor = "top" | "left" | "bottom" | "right";

const TemporaryDrawer = ({ pathname }: { pathname: string | null }) => {
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
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "10px",
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
        }}
      />
      <Link
        href="/"
        style={{ textDecoration: "none" }}
        onClick={toggleDrawer("right", false)}
      >
        <Typography
          sx={{
            color: "black",
            padding: "5px 20px",
            textDecoration: "none",
            transition: ".3s",
            "&&:hover": {
              transform: "scale(1.1)",
              transition: ".3s",
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
            color: "black",
            padding: "5px 20px",
            textDecoration: "none",
            transition: ".3s",
            "&&:hover": {
              transform: "scale(1.1)",
              transition: ".3s",
            },
          }}
        >
          Libros
        </Typography>
      </Link>
      <Link href="/register" onClick={toggleDrawer("right", false)}>
        <Button
          variant="outlined"
          sx={{
            color: "black",
            borderRadius: "20px",
            borderColor: "black",
            transition: ".3s",
            "&&:hover": {
              backgroundColor: "rgba(0,0,0,0.3)",
              color: "white",
              borderColor: "white",
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
            color: "black",
            borderRadius: "20px",
            borderColor: "black",
            transition: ".3s",
            "&&:hover": {
              backgroundColor: "rgba(0,0,0,0.3)",
              color: "white",
              borderColor: "white",
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
          sx={{ fontSize: "2rem", color: pathname == "/" ? "white" : "black" }}
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
