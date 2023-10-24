import { Box } from "@mui/material";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box className={styles.main_text_container}>
        <h1 className={styles.main_text}>
          Hola! Nosotros somos&nbsp;<span className={styles.typewriter}></span>
        </h1>
      </Box>
    </main>
  );
}
