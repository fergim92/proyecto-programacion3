/* eslint-disable indent */
"use client";
import { Box, Button, Typography } from "@mui/material";
import styles from "./header.module.css";
import Image from "next/image";
import COIL_logo_light from "../../public/COIL-logo-light.png";
import Link from "next/link";
import DrawerButton from "./drawer";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={
        pathname == "/"
          ? {
              width: "100%",
              boxShadow: "0 5px 30px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(8.4px)",
              "&&:-webkit-backdrop-filter": "blur(8.4px)",
              position: "sticky",
              top: "0",
              zIndex: 1,
              "@media (min-width: 900px)": {
                height: "88px",
                marginTop: "-88px",
              },
              "@media (max-width: 900px)": {
                height: "72px",
                marginTop: "-72px",
              },
            }
          : {
              width: "100%",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              position: "sticky",
              top: "0",
              zIndex: 1,
              backgroundColor: theme.palette.background.paper,
            }
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 30px",
        }}
      >
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
            src={COIL_logo_light}
            alt="Logo"
            priority
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
          <DrawerButton />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
            justifyContent: "flex-end",
            margin: 0,
            "@media (max-width: 900px)": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "15px",
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                padding: "5px 10px",
              }}
            >
              <Typography
                color={theme.palette.text.primary}
                sx={{
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
              style={{ textDecoration: "none", padding: "5px 10px" }}
            >
              <Typography
                color={theme.palette.text.primary}
                sx={{
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            <Link href="/register">
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
            <Link href="/login">
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
        </Box>
      </Box>
    </Box>
  );
};
export default Header;
