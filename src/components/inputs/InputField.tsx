import { Box, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { getValidationRules } from "./inputFieldUtils";

export enum INPUT_FIELD_VARIANTS {
  FILLED = "filled",
  OUTLINED = "outlined",
  STANDARD = "standard",
}

type InputProps = {
  label: string;
  type: string;
  variant: INPUT_FIELD_VARIANTS;
  required?: boolean;
  dataName: string;
  watchedInput?: string;
  minPasswordLength?: number;
  dataTestId: string;
};

export default function InputField({
  label,
  type,
  variant,
  required = false,
  dataName,
  watchedInput,
  minPasswordLength,
  dataTestId,
}: InputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const validationRules = getValidationRules({
    label,
    required,
    minPasswordLength,
    watchedInput,
    watch,
    type,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        marginBottom: "10px",
        ".MuiFormHelperText-root": { m: 0 },
      }}
    >
      <TextField
        sx={{
          width: "20rem",
        }}
        {...register(dataName, validationRules)}
        variant={variant}
        label={label}
        type={type}
        error={!!errors[dataName]?.message}
        placeholder={label}
        helperText={errors[dataName]?.message as string}
        inputProps={{ "data-testid": dataTestId }}
      />
    </Box>
  );
}
