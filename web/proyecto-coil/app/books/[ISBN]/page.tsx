"use client";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useTheme } from "@mui/material/styles";
import Loader from "@/components/Loader/loader";

interface BookType {
  ISBN: string;
  anio_de_publicacion: number;
  cantidad_disponible: number;
  id_editorial: number;
  id_idioma: number;
  imagen_url: string;
  titulo: string;
}

const BookDetail = () => {
  const pathname = usePathname();
  const theme = useTheme();
  if (!pathname) return <Typography>No hay nada</Typography>;
  const parts = pathname.split("/");
  const isbnFromPathname = parts[parts.length - 1];
  const [data, setData] = useState<BookType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        "https://proyecto-programacion3-bmv3.vercel.app/api/books"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const books = await res.json();
      const bookWithISBN = books.find(
        (book: BookType) => book.ISBN === isbnFromPathname
      );
      setData(bookWithISBN);
      setLoading(false);
    };

    fetchData();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <main style={{ height: "auto", display: "flex", flexDirection: "column" }}>
      {data && (
        <Card
          raised
          sx={{
            margin: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "@media (min-width: 900px)": {
              flexDirection: "row",
              width: "100%",
              maxWidth: "700px",
            },
            "@media (max-width: 900px)": {
              flexDirection: "column",
              width: "100%",
              maxWidth: "300px",
            },
          }}
          key={data.ISBN}
        >
          <CardMedia
            component="img"
            sx={{
              "@media (min-width: 900px)": {
                maxHeight: "60vh",
              },
              "@media (max-width: 900px)": {
                maxHeight: "350px",
              },
            }}
            image={data.imagen_url}
            title={data.titulo}
            alt={data.titulo}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              gap: "5px",
              backgroundColor: theme.palette.background.paper,
              "@media (min-width: 900px)": {
                minHeight: "60vh",
              },
            }}
          >
            <Typography className={styles.book_info}>
              <Typography
                className={styles.book_info}
                component="span"
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Título:
              </Typography>{" "}
              {data.titulo}
            </Typography>
            <Typography className={styles.book_info}>
              <Typography
                className={styles.book_info}
                component="span"
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Año de publicación:
              </Typography>{" "}
              {data.anio_de_publicacion}
            </Typography>
            <Typography className={styles.book_info}>
              <Typography
                className={styles.book_info}
                component="span"
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Cantidad disponible:
              </Typography>{" "}
              {data.cantidad_disponible}
            </Typography>
            <Typography className={styles.book_info}>
              <Typography
                className={styles.book_info}
                component="span"
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Idioma:
              </Typography>{" "}
              {data.id_idioma == 1 && "Ingles"}
              {data.id_idioma == 2 && "Español"}
            </Typography>
            <Typography className={styles.book_info}>
              <Typography
                className={styles.book_info}
                component="span"
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                ID Editorial:
              </Typography>{" "}
              {data.id_editorial}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Link href="/books">
        <Button
          sx={{
            "@media (min-width: 900px)": {
              fontSize: "16px",
            },
            "@media (max-width: 900px)": {
              fontSize: "13px",
            },
          }}
        >
          Volver
        </Button>
      </Link>
    </main>
  );
};

export default BookDetail;
