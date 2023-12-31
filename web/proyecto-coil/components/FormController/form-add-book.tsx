import { Box, Button, FormControl, InputLabel } from "@mui/material";
import ControlledInput from "./controlled-input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledSelect from "./controlled-select";
import { useEffect } from "react";
import { BookType } from "@/types/types";
import { schema } from "@/schemas/schemas";

type FormData = yup.InferType<typeof schema>;

type OnBookAdded = (newBook: BookType) => void;

interface FormAddBookProps {
  onBookAdded: OnBookAdded;
}

const FormAddBook = ({ onBookAdded }: FormAddBookProps) => {
  const {
    handleSubmit,
    formState,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    onBookAdded(data);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "25px",
            width: "100%",
            "@media (min-width: 900px)": {
              flexDirection: "row",
            },
            "@media (max-width: 900px)": {
              flexDirection: "column",
            },
          }}
        >
          <ControlledInput
            name="titulo"
            control={control}
            type="text"
            label="Titulo*"
            errorMessage={errors["titulo"]?.message}
            variant="filled"
            size="medium"
            errorType="normal"
          />
          <ControlledInput
            name="ISBN"
            control={control}
            type="text"
            label="ISBN*"
            errorMessage={errors["ISBN"]?.message}
            variant="filled"
            size="medium"
            errorType="normal"
          />
          <ControlledInput
            name="anio_de_publicacion"
            control={control}
            type="text"
            label="Año de publicación*"
            errorMessage={errors["anio_de_publicacion"]?.message}
            variant="filled"
            size="medium"
            errorType="normal"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "25px",
            width: "100%",
            "@media (min-width: 900px)": {
              flexDirection: "row",
            },
            "@media (max-width: 900px)": {
              flexDirection: "column",
            },
          }}
        >
          <ControlledInput
            name="cantidad_disponible"
            control={control}
            type="text"
            label="Cantidad disponible*"
            errorMessage={errors["cantidad_disponible"]?.message}
            variant="filled"
            size="medium"
            errorType="normal"
          />
          <ControlledInput
            name="id_editorial"
            control={control}
            type="text"
            label="ID editorial*"
            errorMessage={errors["id_editorial"]?.message}
            variant="filled"
            size="medium"
            errorType="normal"
          />
          <FormControl fullWidth>
            <InputLabel
              sx={{
                "&.MuiInputLabel-shrink": {
                  transform: "translate(12px, 7px) scale(0.75) !important",
                },
              }}
            >
              Seleccionar idioma*
            </InputLabel>
            <ControlledSelect
              name="id_idioma"
              control={control}
              label="Idioma*"
              labelId="select-label"
              items={["Ingles", "Español"]}
              errorMessage={errors["id_idioma"]?.message || ""}
              variant="filled"
              errorType="normal"
            />
          </FormControl>
        </Box>
        <ControlledInput
          name="imagen_url"
          control={control}
          type="text"
          label="URL imagen*"
          errorMessage={errors["imagen_url"]?.message}
          variant="filled"
          size="medium"
          errorType="normal"
        />
        <Box>
          <Button
            type="submit"
            disabled={isSubmitting}
            sx={{
              "@media only screen and (max-width: 768px)": {
                marginTop: "10px",
              },
              "@media only screen and (min-width: 768px)": {
                marginTop: "0px",
              },
            }}
          >
            Añadir libro
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default FormAddBook;
