"use client";
import styles from "./main-background.module.css";
import { useTheme } from "@mui/material/styles";
import React from "react";

type Props = {
  children?: React.ReactNode;
};
export default function MainBackground({ children }: Props) {
  const theme = useTheme();
  return (
    <main
      className={
        theme.palette.mode == "light" ? styles.main_light : styles.main_dark
      }
    >
      {children}
    </main>
  );
}
