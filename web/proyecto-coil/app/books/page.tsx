"use client";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Loader from "@/components/Loader/loader";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormAddBook from "@/components/FormController/form-add-book";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import Swal from "sweetalert2";
import "./page.css";
import useSWR from "swr";
import { useEffect, useState } from "react";

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

const Books = () => {
  const {
    data,
    error,
    isLoading,
    mutate: mutateList,
  } = useSWR("/api/books", (...args) =>
    fetch(...args).then((res) => res.json())
  );
  const theme = useTheme();
  const [windowDimensions, setWindowDimensions] = useState(
    typeof window !== "undefined"
      ? getWindowDimensions()
      : { width: 0, height: 0 }
  );
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
  const addBook = async (newBook: BookType) => {
    const oldData = data;
    const newData = [...data, newBook];
    await mutateList(newData, false);
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        Toast.fire({
          icon: "error",
          iconColor: "red",
          title: "Error al agregar el libro",
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

  const deleteBook = async (deletedBookISBN: string) => {
    const oldData = data;
    const newData = data.filter(
      (book: BookType) => book.ISBN !== deletedBookISBN
    );
    await mutateList(newData, false);

    try {
      const response = await fetch(`/api/books/${deletedBookISBN}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        await mutateList(oldData, false);
        Toast.fire({
          icon: "error",
          iconColor: "red",
          title: "Error al borrar el libro",
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        });
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <div>Error al cargar los datos</div>;
  if (isLoading) return <Loader />;

  return (
    <main
      style={{
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <Accordion
        sx={{
          width: "100%",
          marginBottom: "10px",
          boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Agregar libro</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormAddBook onBookAdded={(bookAdded) => addBook(bookAdded)} />
        </AccordionDetails>
      </Accordion>
      <Box
        sx={{
          width: "100%",
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
              position: "relative",
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
            <CancelTwoToneIcon
              sx={{
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "30px",
                cursor: "pointer",
                color: "red",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "50%",
              }}
              onClick={() => {
                Swal.fire({
                  customClass: {
                    title: "titulo_alert",
                  },
                  title: `Estas seguro de eliminar "${book.titulo}"?`,
                  icon: "warning",
                  showCancelButton: true,
                  iconColor: "red",
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  confirmButtonColor: "red",
                  confirmButtonText: "Si, deseo eliminarlo!",
                  cancelButtonColor: theme.palette.background.paper,
                  cancelButtonText: `<span style="color: ${theme.palette.text.primary}">Cancelar</span>`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteBook(book.ISBN);
                    Swal.fire({
                      customClass: {
                        title: "titulo_alert",
                      },
                      title: "Eliminado!",
                      icon: "success",
                      iconColor: theme.palette.primary.main,
                      background: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      confirmButtonText: `<span style="color: ${theme.palette.text.primary}">Volver</span>`,
                      confirmButtonColor: theme.palette.background.paper,
                    });
                  }
                });
              }}
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
