"use client";
import { Box, Button, Typography } from "@mui/material";
import styles from "./header.module.css";
import Image from "next/image";
import COIL_logo_light from "../../public/COIL-logo-light.png";
import COIL_logo_dark from "../../public/COIL-logo-dark.png";
import Link from "next/link";
import DrawerButton from "./drawer";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={pathname == "/" ? styles.header_home : styles.header}>
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
          <Image
            className={styles.logo}
            src={pathname == "/" ? COIL_logo_light : COIL_logo_dark}
            alt="Logo"
          />
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
          <DrawerButton pathname={pathname} />
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
            {pathname == "/" ? (
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
            ) : (
              <Typography
                sx={{
                  color: "black",
                  padding: "5px 20px",
                  textDecoration: "none",
                  transition: ".3s",
                  "&&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Inicio
              </Typography>
            )}
          </Link>
          <Link href="/books" style={{ textDecoration: "none" }}>
            {pathname == "/" ? (
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
            ) : (
              <Typography
                sx={{
                  color: "black",
                  padding: "5px 20px",
                  textDecoration: "none",
                  transition: ".3s",
                  "&&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Libros
              </Typography>
            )}
          </Link>
          <Link href="/register">
            {pathname == "/" ? (
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
            ) : (
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  borderRadius: "30px",
                  borderColor: "black",
                  transition: ".3s",
                  "&&:hover": {
                    backgroundColor: "rgba(0,0,0,0.3)",
                    color: "white)",
                    borderColor: "black",
                  },
                }}
              >
                Registrarse
              </Button>
            )}
          </Link>
          <Link href="/login">
            {pathname == "/" ? (
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
            ) : (
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  borderRadius: "30px",
                  borderColor: "black",
                  transition: ".3s",
                  "&&:hover": {
                    backgroundColor: "rgba(0,0,0,0.3)",
                    color: "white)",
                    borderColor: "black",
                  },
                }}
              >
                Iniciar sesión
              </Button>
            )}
          </Link>
        </Box>
      </Box>
    </header>
  );
};
export default Header;
