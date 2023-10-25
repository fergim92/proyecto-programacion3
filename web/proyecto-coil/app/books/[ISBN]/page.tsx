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

interface BookType {
  ISBN: string;
  anio_de_publicacion: number;
  cantidad_disponible: number;
  id_editorial: number;
  id_idioma: number;
  imagen_url: string;
  titulo: string;
}

async function getDataByISBN(isbn: string) {
  const res = await fetch(
    "https://proyecto-programacion3-bmv3.vercel.app/api/books"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const books = await res.json();
  const bookWithISBN = books.find((book: BookType) => book.ISBN === isbn);
  return bookWithISBN;
}

interface BookType {
  ISBN: string;
  anio_de_publicacion: number;
  cantidad_disponible: number;
  id_editorial: number;
  id_idioma: number;
  imagen_url: string;
  titulo: string;
}

const BookDetail = async () => {
  const pathname = usePathname();
  if (!pathname) return <Typography>No hay nada</Typography>;
  const parts = pathname.split("/");
  const isbnFromPathname = parts[parts.length - 1];
  const data = await getDataByISBN(isbnFromPathname);
  return (
    <main style={{ height: "auto", display: "flex", flexDirection: "column" }}>
      <Card
        raised
        sx={{
          margin: "15px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        key={data.ISBN}
      >
        <CardMedia
          component="img"
          sx={{ maxHeight: "300px" }}
          image={
            data.imagen_url
              ? data.imagen_url
              : "https://dummyimage.com/277x425/000/fff.jpg&text=Image+not+found"
          }
          title={data.titulo}
          alt={data.titulo}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "100%",
            gap: "5px",
          }}
        >
          <Typography>
            <Typography
              component="span"
              sx={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Título:
            </Typography>{" "}
            {data.titulo}
          </Typography>
          <Typography>
            <Typography
              component="span"
              sx={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Año de publicación:
            </Typography>{" "}
            {data.anio_de_publicacion}
          </Typography>
          <Typography>
            <Typography
              component="span"
              sx={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Cantidad disponible:
            </Typography>{" "}
            {data.cantidad_disponible}
          </Typography>
          <Typography>
            <Typography
              component="span"
              sx={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Idioma:
            </Typography>{" "}
            {data.id_idioma == 1 && "Ingles"}
            {data.id_idioma == 2 && "Español"}
          </Typography>
          <Typography>
            <Typography
              component="span"
              sx={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              ID Editorial:
            </Typography>{" "}
            {data.id_editorial}
          </Typography>
        </CardContent>
      </Card>
      <Link href="/books">
        <Button
          sx={{
            fontSize: "16px",
          }}
        >
          Volver
        </Button>
      </Link>
    </main>
  );
};

export default BookDetail;
