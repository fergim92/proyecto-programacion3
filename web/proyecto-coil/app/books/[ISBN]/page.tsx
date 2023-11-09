"use client";
import {
  Box,
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
import EditIcon from "@mui/icons-material/Edit";
import useSWR from "swr";
import Swal from "sweetalert2";
import FormUpdateBook from "@/components/FormController/form-update-book";
interface BookType {
  ISBN: string;
  anio_de_publicacion: number;
  cantidad_disponible: number;
  id_editorial: number;
  id_idioma: number;
  imagen_url: string;
  titulo: string;
}
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
const BookDetail = () => {
  const pathname = usePathname();
  const theme = useTheme();
  if (!pathname) return <Typography>No hay nada</Typography>;
  const parts = pathname.split("/");
  const isbnFromPathname = parts[parts.length - 1];
  const {
    data,
    error,
    isLoading,
    mutate: mutateList,
  } = useSWR(`/api/books/${isbnFromPathname}`, (...args) =>
    fetch(...args).then((res) => res.json())
  );
  const [windowDimensions, setWindowDimensions] = useState(
    typeof window !== "undefined"
      ? getWindowDimensions()
      : { width: 0, height: 0 }
  );
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Toast = Swal.mixin({
    toast: true,
    position: windowDimensions.width > 900 ? "bottom-end" : "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const updateBook = async (updatedBook: BookType) => {
    const oldData = data;
    const newData = updatedBook;
    await mutateList(newData, false);
    Toast.fire({
      icon: "success",
      iconColor: "green",
      title: "Libro modificado",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    });
    try {
      const response = await fetch(`/api/books/${isbnFromPathname}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });
      if (!response.ok) {
        Toast.fire({
          icon: "error",
          iconColor: "red",
          title: "Error al modificar el libro",
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        });
        await mutateList(oldData, false);
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error al cargar los datos</div>;

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
            position: "relative",
            width: "100%",
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
          {!onEdit && (
            <Box
              onClick={() => {
                onEdit ? setOnEdit(false) : setOnEdit(true);
              }}
              sx={{
                position: "absolute",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: "5px",
                transition: "0.1s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.1)",
                },
                "@media (min-width: 900px)": {
                  top: "10px",
                  right: "10px",
                },
                "@media (max-width: 900px)": {
                  bottom: "10px",
                  right: "10px",
                },
              }}
            >
              <Typography>Editar</Typography>
              <EditIcon
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </Box>
          )}

          <CardMedia
            component="img"
            sx={{
              width: "50%",
              "@media (min-width: 900px)": {
                maxHeight: "382px",
              },
              "@media (max-width: 900px)": {
                maxHeight: "350px",
                width: "100%",
              },
            }}
            image={data.imagen_url}
            title={data.titulo}
            alt={data.titulo}
          />
          {onEdit ? (
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "50%",
                padding: "10px",
                backgroundColor: theme.palette.background.paper,
                "@media (min-width: 900px)": {
                  minHeight: "382px",
                },
                "@media (max-width: 900px)": {
                  width: "100%",
                },
                "&&.MuiCardContent-root": {
                  paddingBottom: "10px !important",
                },
              }}
            >
              <FormUpdateBook
                onBookUpdated={(bookUpdated) => updateBook(bookUpdated)}
                bookInfo={data}
                cancelUpdate={() => setOnEdit(false)}
              />
            </CardContent>
          ) : (
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "50%",
                gap: "5px",
                backgroundColor: theme.palette.background.paper,
                "@media (min-width: 900px)": {
                  minHeight: "382px",
                },
                "@media (max-width: 900px)": {
                  width: "100%",
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
                  ISBN:
                </Typography>{" "}
                {data.ISBN}
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
                  ID Editorial:
                </Typography>{" "}
                {data.id_editorial}
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
            </CardContent>
          )}
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
