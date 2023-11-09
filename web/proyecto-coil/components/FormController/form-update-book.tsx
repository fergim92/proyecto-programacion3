import { Box, Button, FormControl, InputLabel } from "@mui/material";
import ControlledInput from "./controlled-input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledSelect from "./controlled-select";
import { useEffect, useState } from "react";

const schema = yup
  .object({
    ISBN: yup.string().required("El ISBN es requerido."),
    anio_de_publicacion: yup
      .number()
      .typeError("El año de publicación debe ser un número.")
      .required("El año de publicación es requerido.")
      .max(new Date().getFullYear(), "El año no puede ser en el futuro."),
    cantidad_disponible: yup
      .number()
      .typeError("La cantidad disponible debe ser un número.")
      .required("La cantidad disponible es requerida.")
      .min(0, "La cantidad disponible no puede ser negativa."),
    id_editorial: yup
      .number()
      .typeError("El ID de la editorial debe ser un número.")
      .required("El ID de la editorial es requerido."),
    id_idioma: yup
      .number()
      .typeError("El ID del idioma debe ser un número.")
      .required("El ID del idioma es requerido."),
    imagen_url: yup
      .string()
      .url("La URL de la imagen debe ser válida.")
      .required("La URL de la imagen es requerida."),
    titulo: yup.string().required("El título es requerido."),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
interface BookType {
  ISBN: string;
  anio_de_publicacion: number;
  cantidad_disponible: number;
  id_editorial: number;
  id_idioma: number;
  imagen_url: string;
  titulo: string;
}

type OnBookUpdated = (updatedBook: BookType) => void;
type OnCancelUpdated = () => void;

interface FormUpdateBookProps {
  onBookUpdated: OnBookUpdated;
  bookInfo: BookType;
  cancelUpdate: OnCancelUpdated;
}
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const FormUpdateBook = ({
  onBookUpdated,
  bookInfo,
  cancelUpdate,
}: FormUpdateBookProps) => {
  const {
    handleSubmit,
    formState,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
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

  const onSubmit = async (data: FormData) => {
    onBookUpdated(data);
    cancelUpdate();
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          "@media (max-width: 900px)": {
            gap: "12px",
          },
        }}
      >
        <ControlledInput
          name="titulo"
          control={control}
          type="text"
          label="Titulo*"
          errorMessage={errors["titulo"]?.message}
          variant="standard"
          size="small"
          defaultValue={bookInfo.titulo}
          errorType={windowDimensions.width > 900 ? "toolTip" : "normal"}
          sx={{
            "& .MuiInputLabel-shrink": {
              transform: "translate(0, 2px) scale(0.75); !important",
            },
          }}
        />
        <ControlledInput
          name="ISBN"
          control={control}
          type="text"
          label="ISBN*"
          errorMessage={errors["ISBN"]?.message}
          variant="standard"
          size="small"
          defaultValue={bookInfo.ISBN}
          errorType={windowDimensions.width > 900 ? "toolTip" : "normal"}
          sx={{
            "& .MuiInputLabel-shrink": {
              transform: "translate(0, 2px) scale(0.75); !important",
            },
          }}
        />
        <ControlledInput
          name="anio_de_publicacion"
          control={control}
          type="text"
          label="Año de publicación*"
          errorMessage={errors["anio_de_publicacion"]?.message}
          variant="standard"
          size="small"
          defaultValue={bookInfo.anio_de_publicacion}
          errorType={windowDimensions.width > 900 ? "toolTip" : "normal"}
          sx={{
            "& .MuiInputLabel-shrink": {
              transform: "translate(0, 2px) scale(0.75); !important",
            },
          }}
        />
        <ControlledInput
          name="cantidad_disponible"
          control={control}
          type="text"
          label="Cantidad disponible*"
          errorMessage={errors["cantidad_disponible"]?.message}
          variant="standard"
          size="small"
          defaultValue={bookInfo.cantidad_disponible}
          errorType={windowDimensions.width > 900 ? "toolTip" : "normal"}
          sx={{
            "& .MuiInputLabel-shrink": {
              transform: "translate(0, 2px) scale(0.75); !important",
            },
          }}
        />
        <ControlledInput
          name="id_editorial"
          control={control}
          type="text"
          label="ID editorial*"
          errorMessage={errors["id_editorial"]?.message}
          variant="standard"
          size="small"
          defaultValue={bookInfo.id_editorial}
          errorType={windowDimensions.width > 900 ? "toolTip" : "normal"}
          sx={{
            "& .MuiInputLabel-shrink": {
              transform: "translate(0, 2px) scale(0.75); !important",
            },
          }}
        />
        <FormControl fullWidth sx={{ height: "100%" }}>
          <InputLabel
            sx={{
              "&.MuiInputLabel-shrink": {
                transform: "translate(0, 2px) scale(0.75); !important",
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
            variant="standard"
            defaultValue={bookInfo.id_idioma}
            size="small"
            errorType={windowDimensions.width > 900 ? "toolTip" : "normal"}
            sx={{
              "& .MuiInput-input": { paddingTop: "17px !important" },
              "& .MuiInputLabel-shrink": {
                transform: "translate(0, 2px) scale(0.75); !important",
              },
            }}
          />
        </FormControl>
        <ControlledInput
          name="imagen_url"
          control={control}
          type="text"
          label="URL imagen*"
          errorMessage={errors["imagen_url"]?.message}
          variant="standard"
          size="small"
          defaultValue={bookInfo.imagen_url}
          errorType={windowDimensions.width > 900 ? "toolTip" : "normal"}
          sx={{
            "& .MuiInputLabel-shrink": {
              transform: "translate(0, 2px) scale(0.75); !important",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <Button type="submit" disabled={isSubmitting}>
            Actualizar libro
          </Button>
          <Button
            disabled={isSubmitting}
            sx={{
              color: "red",
              transition: "0.1s",
              "&:hover": {
                backgroundColor: "rgba(255,0,0,0.05)",
              },
            }}
            onClick={() => cancelUpdate()}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default FormUpdateBook;
