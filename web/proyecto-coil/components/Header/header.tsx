"use client";
import { Box, Button, Typography } from "@mui/material";
import styles from "./header.module.css";
import Image from "next/image";
import COIL_logo_light from "../../public/COIL-logo-light.png";
import Link from "next/link";
import DrawerButton from "./drawer";

const Header = () => {
  return (
    <header className={styles.header}>
      <Box className={styles.container}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
          }}
        >
          <Image className={styles.logo} src={COIL_logo_light} alt="Logo" />
        </Link>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            margin: 0,
            "@media (min-width: 900px)": {
              display: "none",
            },
          }}
        >
          <DrawerButton />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
            justifyContent: "flex-end",
            margin: 0,
            "@media (max-width: 900px)": {
              display: "none",
            },
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "white",
                padding: "5px 20px",
                textDecoration: "none",
                transition: ".3s",
                "&&:hover": {
                  color: "rgba(125, 250, 125, 1)",
                },
              }}
            >
              Inicio
            </Typography>
          </Link>
          <Link href="/books" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "white",
                padding: "5px 20px",
                textDecoration: "none",
                transition: ".3s",
                "&&:hover": {
                  color: "rgba(125, 250, 125, 1)",
                },
              }}
            >
              Libros
            </Typography>
          </Link>
          <Link href="/register">
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderRadius: "30px",
                borderColor: "white",
                transition: ".3s",
                "&&:hover": {
                  backgroundColor: "rgba(0,0,0,0.3)",
                  color: "rgba(125, 250, 125, 1)",
                  borderColor: "rgba(125, 250, 125, 1)",
                },
              }}
            >
              Registrarse
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderRadius: "30px",
                borderColor: "white",
                transition: ".3s",
                "&&:hover": {
                  backgroundColor: "rgba(0,0,0,0.3)",
                  color: "rgba(125, 250, 125, 1)",
                  borderColor: "rgba(125, 250, 125, 1)",
                },
              }}
            >
              Iniciar sesión
            </Button>
          </Link>
        </Box>
      </Box>
    </header>
  );
};
export default Header;
