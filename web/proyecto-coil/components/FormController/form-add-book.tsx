import { Box, Button, FormControl, InputLabel } from "@mui/material";
import ControlledInput from "./controlled-input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledSelect from "./controlled-select";

const schema = yup
  .object({
    ISBN: yup.string().required("El ISBN es requerido."),
    anio_de_publicacion: yup
      .number()
      .required("El año de publicación es requerido.")
      .max(new Date().getFullYear(), "El año no puede ser en el futuro."),
    cantidad_disponible: yup
      .number()
      .required("La cantidad disponible es requerida.")
      .min(0, "La cantidad disponible no puede ser negativa."),
    id_editorial: yup.number().required("El ID de la editorial es requerido."),
    id_idioma: yup.number().required("El ID del idioma es requerido."),
    imagen_url: yup
      .string()
      .url("La URL de la imagen debe ser válida.")
      .required("La URL de la imagen es requerida."),
    titulo: yup.string().required("El título es requerido."),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const FormAddBook = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/books", {
        // Reemplaza '/api/books' con la URL de tu endpoint de la API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convierte los datos del formulario a una cadena JSON
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      const result = await response.json(); // Obtiene la respuesta de tu API

      console.log(result); // Haz algo con la respuesta (por ejemplo, mostrar un mensaje de éxito)
    } catch (error) {
      console.error(error);
    }
  };
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
          />
          <ControlledInput
            name="ISBN"
            control={control}
            type="text"
            label="ISBN*"
            errorMessage={errors["ISBN"]?.message}
            variant="filled"
            size="medium"
          />
          <ControlledInput
            name="anio_de_publicacion"
            control={control}
            type="text"
            label="Año de publicación*"
            errorMessage={errors["anio_de_publicacion"]?.message}
            variant="filled"
            size="medium"
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
          />
          <ControlledInput
            name="id_editorial"
            control={control}
            type="text"
            label="ID editorial*"
            errorMessage={errors["id_editorial"]?.message}
            variant="filled"
            size="medium"
          />
          <FormControl fullWidth>
            <InputLabel
              sx={{
                "&.MuiInputLabel-shrink": {
                  transform: "translate(12px, 7px) scale(0.75) !important",
                },
              }}
            >
              Seleccionar idioma
            </InputLabel>
            <ControlledSelect
              name="id_idioma"
              control={control}
              label="Idioma*"
              labelId="select-label"
              items={["Ingles", "Español"]}
              errorMessage={errors["id_idioma"]?.message || ""}
              defaultValue=""
              variant="filled"
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
            Agregar libro
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default FormAddBook;
