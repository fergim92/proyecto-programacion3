"use client";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

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
    return <CircularProgress sx={{ color: "#191919" }} />;
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
              maxWidth: 180,
              margin: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={book.ISBN}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{ maxHeight: "280px" }}
                image={
                  book.imagen_url
                    ? book.imagen_url
                    : "https://dummyimage.com/277x425/000/fff.jpg&text=Image+not+found"
                }
                title={book.titulo}
                alt={book.titulo}
              />
              <CardContent>
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
            </CardActionArea>
            <CardActions>
              <Link href={`/books/${book.ISBN}`}>
                <Button size="small" color="primary">
                  Detalle
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
