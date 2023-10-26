/* eslint-disable indent */
"use client";
import { Box, IconButton, Typography } from "@mui/material";
import styles from "./header.module.css";
import Image from "next/image";
import COIL_logo_light from "../../public/COIL-logo-light.png";
import COIL_logo_dark from "../../public/COIL-logo-dark.png";
import Link from "next/link";
import DrawerButton from "./drawer";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { ColorModeContext } from "@/context/ColorModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { alpha } from "@mui/material";

const Header = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      component="header"
      sx={
        pathname == "/"
          ? {
              width: "100%",
              boxShadow: "0 5px 30px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(8.4px)",
              "&&:WebkitBackdropFilter": "blur(8.4px)",
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
            src={
              theme.palette.mode == "light" ? COIL_logo_dark : COIL_logo_light
            }
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
              style={{ textDecoration: "none", padding: "5px 10px" }}
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
              style={{ textDecoration: "none", padding: "5px 10px" }}
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
              style={{ textDecoration: "none", padding: "5px 10px" }}
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
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
export default Header;
