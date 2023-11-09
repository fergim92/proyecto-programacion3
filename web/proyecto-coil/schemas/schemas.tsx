import * as yup from "yup";
export const schema = yup
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
