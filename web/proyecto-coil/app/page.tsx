import { Box, Button } from "@mui/material";
import styles from "./page.module.css";
import MainBackground from "@/components/MainBackground/mainBackground";
import Typing from "@/components/Typing/typing";
import Link from "next/link";

export default function Home() {
  return (
    <MainBackground>
      <Box className={styles.main_text_container}>
        <Typing />
      </Box>
      <Link href="/books">
        <Button className={styles.main_button} sx={{ marginTop: "50px" }}>
          Visita nuestra biblioteca
        </Button>
      </Link>
    </MainBackground>
  );
}
