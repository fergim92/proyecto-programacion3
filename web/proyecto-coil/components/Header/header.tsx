"use client";
import { Box, Button, Typography } from "@mui/material";
import styles from "./header.module.css";
import Image from "next/image";
import COIL_logo_dark from "../../public/COIL-logo-dark.png";
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
          <Image className={styles.logo} src={COIL_logo_dark} alt="Logo" />
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
              Home
            </Typography>
          </Link>
          <Link href="/register">
            <Button
              variant="outlined"
              sx={{
                color: "black",
                borderRadius: "30px",
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
          <Link href="/login">
            <Button
              variant="outlined"
              sx={{
                color: "black",
                borderRadius: "30px",
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
      </Box>
    </header>
  );
};
export default Header;
