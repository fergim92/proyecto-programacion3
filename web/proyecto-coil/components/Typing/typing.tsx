"use client";
import { Typography } from "@mui/material";
import styles from "./typing.module.css";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";

export default function Typing() {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        color: theme.palette.primary.main,
        fontFamily: "monospace",
        textShadow: `0 0 5px ${alpha(
          theme.palette.primary.main,
          0.5
        )}, 0 0 15px ${theme.palette.primary.main}`,
        "@media (min-width: 900px)": {
          fontSize: "40px",
        },
        "@media (max-width: 900px)": {
          fontSize: "20px",
        },
      }}
    >
      Hola! Nosotros somos&nbsp;<span className={styles.typewriter}></span>
    </Typography>
  );
}
