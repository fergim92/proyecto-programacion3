import { Box, Button } from "@mui/material";
import styles from "./page.module.css";
import MainBackground from "@/components/MainBackground/main-background";
import Typing from "@/components/Typing/typing";
import Link from "next/link";

export default function Home() {
  return (
    <MainBackground>
      <Box className={styles.main_text_container}>
        <Typing />
      </Box>
      <Link href="/books" style={{ marginTop: "50px" }}>
        <Button className={styles.main_button}>
          Visita nuestra biblioteca
        </Button>
      </Link>
    </MainBackground>
  );
}
