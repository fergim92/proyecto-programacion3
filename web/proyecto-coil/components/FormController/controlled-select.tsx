import { Select, MenuItem, Box, Typography, Tooltip } from "@mui/material";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

interface SelectType<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: string;
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
  items: string[];
  labelId: string;
  errorMessage?: string;
  errorType?: "normal" | "toolTip";
  variant?: "outlined" | "standard" | "filled" | undefined;
  size?: "small" | "medium";
  sx?: object;
}

const ControlledSelect = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  defaultValue,
  items,
  labelId,
  errorMessage,
  errorType,
  variant,
  size,
  sx,
}: SelectType<T>) => {
  if (errorType == "normal") {
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
          defaultValue={defaultValue}
          render={({ field: { name, value, onChange }, field }) => (
            <>
              <Select
                {...field}
                fullWidth
                labelId={labelId}
                name={name}
                value={value || ""}
                label={label}
                displayEmpty
                onChange={onChange}
                size={size}
                variant={variant}
                sx={sx}
              >
                {items.map((item: string, index: number) => {
                  return (
                    <MenuItem
                      key={item + index}
                      value={item == "Ingles" ? 1 : 2}
                    >
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
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
                      fontSize: "15px",
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
          name={name as Path<T>}
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
              <Select
                {...field}
                fullWidth
                labelId={labelId}
                name={name}
                value={value || ""}
                label={label}
                displayEmpty
                onChange={onChange}
                size={size}
                variant={variant}
                sx={sx}
              >
                {items.map((item: string, index: number) => {
                  return (
                    <MenuItem
                      key={item + index}
                      value={item == "Ingles" ? 1 : 2}
                    >
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </Tooltip>
          )}
        />
      </Box>
    );
  }
};

export default ControlledSelect;
