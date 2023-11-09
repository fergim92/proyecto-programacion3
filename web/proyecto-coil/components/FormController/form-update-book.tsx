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

type OnBookUpdated = (updatedBook: BookType) => void;
type OnCancelUpdated = () => void;

interface FormUpdateBookProps {
  onBookUpdated: OnBookUpdated;
  bookInfo: BookType;
  cancelUpdate: OnCancelUpdated;
  view: "library" | "detail";
}

const FormUpdateBook = ({
  onBookUpdated,
  bookInfo,
  cancelUpdate,
  view,
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
          gap: view == "library" ? "15px" : "0px",
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
          errorType={view == "detail" ? "toolTip" : "normal"}
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
          InputProps={{
            readOnly: true,
          }}
          defaultValue={bookInfo.ISBN}
          errorType={view == "detail" ? "toolTip" : "normal"}
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
          errorType={view == "detail" ? "toolTip" : "normal"}
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
          errorType={view == "detail" ? "toolTip" : "normal"}
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
          errorType={view == "detail" ? "toolTip" : "normal"}
          sx={{
            "& .MuiInputLabel-shrink": {
              transform: "translate(0, 2px) scale(0.75); !important",
            },
          }}
        />
        <FormControl fullWidth sx={{ height: "100%" }}>
          <InputLabel
            sx={{
              "& .MuiFormLabel-root": {
                transform: "translate(0, 2px) scale(0.75); !important",
              },
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
            errorType={view == "detail" ? "toolTip" : "normal"}
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
          errorType={view == "detail" ? "toolTip" : "normal"}
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
