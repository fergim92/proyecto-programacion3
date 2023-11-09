import { Card, Typography, CardMedia, CardContent } from "@mui/material";
import FormUpdateBook from "../FormController/form-update-book";
import { useState } from "react";
import styles from "./book-details.module.css";
import { useTheme } from "@mui/material/styles";
import EditCardButton from "../Buttons/edit-card-button";
import { BookType } from "@/types/types";

interface PropsType {
  data: BookType;
  updateBook: (book: BookType) => void;
}

const BookDetail = ({ data, updateBook }: PropsType) => {
  const [onEdit, setOnEdit] = useState(false);
  const theme = useTheme();
  return (
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
      {!onEdit && <EditCardButton onEdit={onEdit} setOnEdit={setOnEdit} />}

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
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "50%",
          padding: "10px",
          gap: onEdit ? "0px" : "5px",
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
        {onEdit ? (
          <FormUpdateBook
            onBookUpdated={(bookUpdated) => updateBook(bookUpdated)}
            bookInfo={data}
            cancelUpdate={() => setOnEdit(false)}
            view="detail"
          />
        ) : (
          <>
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
              {data.id_idioma == 1 ? "Ingles" : "Español"}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BookDetail;
