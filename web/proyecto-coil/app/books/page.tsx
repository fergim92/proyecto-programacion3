"use client";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
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

const Books = () => {
  const [data, setData] = useState<BookType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        "https://proyecto-programacion3-bmv3.vercel.app/api/books",
        { cache: "no-store" }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const books = await res.json();
      setData(books);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main style={{ height: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {data?.map((book: BookType) => (
          <Card
            raised
            sx={{
              width: "100%",
              "@media (min-width: 900px)": {
                maxWidth: "200px",
              },
              "@media (max-width: 900px)": {
                maxWidth: "300px",
              },
              margin: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={book.ISBN}
          >
            <CardMedia
              component="img"
              sx={{
                height: "100%",
                "@media (min-width: 900px)": {
                  maxHeight: "280px",
                },
                "@media (max-width: 900px)": {
                  maxHeight: "350px",
                },
              }}
              image={book.imagen_url}
              title={book.titulo}
              alt={book.titulo}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                width: "100%",
                flex: 1,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography gutterBottom component="div">
                {book.titulo}
              </Typography>
              <Typography
                gutterBottom
                component="div"
                sx={{ color: "grey", fontSize: "13px" }}
              >
                {book.anio_de_publicacion}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                backgroundColor: theme.palette.background.paper,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <Link href={`/books/${book.ISBN}`} style={{ width: "100%" }}>
                <Button
                  size="medium"
                  color="primary"
                  sx={{ width: "100%", padding: "10px 0" }}
                >
                  Ver detalles
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </main>
  );
};

export default Books;
