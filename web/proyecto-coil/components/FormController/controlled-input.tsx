import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { TextField, Typography, Box, TextFieldVariants } from "@mui/material";

interface InputType<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type: string;
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
  errorMessage?: string;
  variant?: TextFieldVariants;
  size?: "small" | "medium";
  id?: string | number;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFocusCapture?: ({ target }: any) => void;
}

const ControlledInput = <T extends FieldValues = FieldValues>({
  control,
  name,
  type,
  label,
  defaultValue,
  errorMessage,
  variant,
  size,
}: InputType<T>) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { name, value, onChange }, field }) => (
          <TextField
            {...field}
            type={type}
            name={name}
            value={value || ""}
            label={label}
            variant={variant}
            onChange={onChange}
            size={size}
            fullWidth
          />
        )}
      />
      {errorMessage && (
        <Typography
          sx={{
            fontWeight: "400",
            color: "#EE3838",
            fontStyle: "italic",
            display: "block",
            position: "absolute",
            left: "0",
            "@media only screen and (max-width: 900px)": {
              fontSize: "12px",
            },
            "@media only screen and (min-width: 900px)": {
              fontSize: "15px",
            },
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default ControlledInput;
