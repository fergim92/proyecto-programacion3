"use client";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Loader from "@/components/Loader/loader";
import useSWR from "swr";
import Toast from "@/components/Toast/toast";
import BookDetails from "@/components/Cards/book-details";
import { BookType } from "@/types/types";

const BookDetail = () => {
  const toast = Toast();
  const pathname = usePathname();
  const theme = useTheme();
  if (!pathname) return <Typography>No hay nada</Typography>;
  const parts = pathname.split("/");
  const isbnFromPathname = parts[parts.length - 1];
  const { data, error, isLoading, mutate } = useSWR(
    `/api/books/${isbnFromPathname}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  const updateBook = async (updatedBook: BookType) => {
    const oldData = data;
    await mutate(updatedBook, false);
    toast.fire({
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
        toast.fire({
          icon: "error",
          iconColor: "red",
          title: "Error al modificar el libro",
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        });
        await mutate(oldData, false);
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error al cargar los datos</Typography>;

  return (
    <main style={{ height: "auto", display: "flex", flexDirection: "column" }}>
      <BookDetails data={data} updateBook={updateBook} />
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
