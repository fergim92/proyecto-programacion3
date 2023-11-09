import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import {
  TextField,
  Box,
  TextFieldVariants,
  Tooltip,
  Typography,
} from "@mui/material";

interface InputType<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type: string;
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
  errorMessage?: string;
  errorType: "normal" | "toolTip";
  variant?: TextFieldVariants;
  size?: "small" | "medium";
  id?: string | number;
  value?: string;
  InputProps?: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFocusCapture?: ({ target }: any) => void;
  sx?: object;
}

const ControlledInput = <T extends FieldValues = FieldValues>({
  control,
  name,
  type,
  label,
  defaultValue,
  errorMessage,
  errorType,
  variant,
  size,
  sx,
  InputProps,
}: InputType<T>) => {
  if (errorType == "normal") {
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
            <>
              <TextField
                {...field}
                type={type}
                name={name}
                value={value || ""}
                label={label}
                variant={variant}
                onChange={onChange}
                size={size}
                sx={sx}
                InputProps={InputProps}
                fullWidth
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
                      fontSize: "10px",
                    },
                    "@media only screen and (min-width: 900px)": {
                      fontSize: "12px",
                    },
                  }}
                >
                  {errorMessage}
                </Typography>
              )}
            </>
          )}
        />
      </Box>
    );
  } else {
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
            <Tooltip
              title={errorMessage || ""}
              open={Boolean(errorMessage)}
              placement="right"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "red",
                    color: "white",
                    fontSize: "12px",
                  },
                },
              }}
            >
              <TextField
                {...field}
                type={type}
                name={name}
                value={value || ""}
                label={label}
                variant={variant}
                onChange={onChange}
                size={size}
                sx={sx}
                InputProps={InputProps}
                fullWidth
              />
            </Tooltip>
          )}
        />
      </Box>
    );
  }
};

export default ControlledInput;
