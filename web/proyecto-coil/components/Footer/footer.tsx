"use client";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.default,
        width: "100%",
      }}
    >
      <Typography variant="body2" align="center" padding={3}>
        @2023 - Todos los derechos reservados PUCP-UNRN
      </Typography>
    </Box>
  );
};
export default Footer;
