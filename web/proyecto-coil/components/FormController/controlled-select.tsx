import { Select, MenuItem, Box, Typography } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface SelectType<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: string;
  label: string;
  defaultValue: string;
  items: string[];
  labelId: string;
  errorMessage: string;
  variant?: "outlined" | "standard" | "filled" | undefined;
}

const ControlledSelect = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  defaultValue,
  items,
  labelId,
  errorMessage,
  variant,
}: SelectType<T>) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { name, value, onChange }, field }) => (
          <Select
            {...field}
            fullWidth
            labelId={labelId}
            name={name}
            value={value || ""}
            label={label}
            defaultValue={defaultValue}
            onChange={onChange}
            variant={variant}
          >
            {items.map((item: string, index: number) => {
              return (
                <MenuItem key={item + index} value={item == "Ingles" ? 1 : 2}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
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

export default ControlledSelect;
