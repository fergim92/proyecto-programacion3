"use client";
import { CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Loader() {
  const theme = useTheme();
  return <CircularProgress sx={{ color: theme.palette.primary.main }} />;
}
