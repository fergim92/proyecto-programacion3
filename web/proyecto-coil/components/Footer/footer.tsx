import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#a8a8b0",
        width: "100%",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        padding={3}
      >
        @2023 - Todos los derechos reservados PUCP-UNRN
      </Typography>
    </footer>
  );
};
export default Footer;
