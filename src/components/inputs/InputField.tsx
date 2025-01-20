import { TextField } from "@mui/material";
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
  inputSize?: "small" | "medium";
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
  inputSize = "medium",
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
    <TextField
      sx={{
        width: "20rem",
        ".MuiFormHelperText-root": { m: 0 },
      }}
      {...register(dataName, validationRules)}
      variant={variant}
      label={label}
      type={type}
      error={!!errors[dataName]?.message}
      placeholder={label}
      helperText={errors[dataName]?.message as string}
      size={inputSize}
      inputProps={{ "data-testid": dataTestId }}
    />
  );
}
