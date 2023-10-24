import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#191919",
        width: "100%",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        padding={3}
        sx={{
          color: "white",
        }}
      >
        @2023 - Todos los derechos reservados PUCP-UNRN
      </Typography>
    </footer>
  );
};
export default Footer;
