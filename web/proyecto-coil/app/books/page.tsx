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
  Modal,
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
import { useState } from "react";
import { BookType } from "@/types/types";
import EditCardButton from "@/components/Buttons/edit-card-button";
import FormUpdateBook from "@/components/FormController/form-update-book";
import Toast from "@/components/Toast/toast";

const Books = () => {
  const theme = useTheme();
  const toast = Toast();
  const [onEdit, setOnEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    ISBN: "",
    anio_de_publicacion: 1,
    cantidad_disponible: 1,
    id_editorial: 1,
    id_idioma: 1,
    imagen_url: "",
    titulo: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    data,
    error,
    isLoading,
    mutate: mutateList,
  } = useSWR("/api/books", (...args) =>
    fetch(...args).then((res) => res.json())
  );
  const { data: dataBook, mutate: mutateBook } = useSWR(
    `/api/books/${modalData.ISBN}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  const addBook = async (newBook: BookType) => {
    const oldData = data;
    const newData = [...data, newBook];
    await mutateList(newData, false);
    toast.fire({
      icon: "success",
      iconColor: "green",
      title: "Libro agregado",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    });
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        toast.fire({
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
    toast.fire({
      icon: "success",
      iconColor: "green",
      title: "Libro eliminado",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    });
    try {
      const response = await fetch(`/api/books/${deletedBookISBN}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        await mutateList(oldData, false);
        toast.fire({
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
  const updateBook = async (updatedBook: BookType) => {
    const oldData = dataBook;
    const updatedBooks = data.map((book: BookType) =>
      book.ISBN === updatedBook.ISBN ? updatedBook : book
    );
    await mutateBook(updatedBook, false);
    await mutateList(updatedBooks, false);
    toast.fire({
      icon: "success",
      iconColor: "green",
      title: "Libro modificado",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    });
    try {
      const response = await fetch(`/api/books/${updatedBook.ISBN}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });
      if (!response.ok) {
        toast.fire({
          icon: "error",
          iconColor: "red",
          title: "Error al modificar el libro",
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        });
        await mutateBook(oldData, false);
        await mutateList(data, false);
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error al cargar los datos</Typography>;

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
            <Box
              onClick={() => {
                setModalData(book);
                handleOpen();
              }}
            >
              <EditCardButton
                onEdit={onEdit}
                setOnEdit={setOnEdit}
                modalClose={open}
                setModalClose={handleClose}
              />
            </Box>

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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
          }}
        >
          <Box
            sx={{
              width: "80%",
              backgroundColor: theme.palette.background.paper,

              "@media (max-width: 900px)": {
                padding: "30px 10px 10px",
              },
              "@media (min-width: 900px)": {
                padding: "30px 30px 10px",
              },
            }}
          >
            <Typography sx={{ textAlign: "center", fontSize: "20px" }}>
              Edición de libro
            </Typography>
            <FormUpdateBook
              onBookUpdated={(bookUpdated) => updateBook(bookUpdated)}
              bookInfo={modalData}
              cancelUpdate={handleClose}
              view="library"
            />
          </Box>
        </Modal>
      </Box>
    </main>
  );
};

export default Books;
