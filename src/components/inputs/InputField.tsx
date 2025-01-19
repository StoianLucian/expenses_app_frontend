import { Box, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  getValidationRules,
  isPasswordType,
  renderVisibilityComponent,
} from "./inputFieldUtils";
import { useState } from "react";

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
  dataTestId?: string;
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
  const [inputType, setInputType] = useState<string>(type);
  const [visibility, setVisibility] = useState<boolean>(false);

  function toggleVisibility() {
    setVisibility(!visibility);
    setInputType(visibility ? "password" : "text");
  }

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
        type={inputType}
        error={!!errors[dataName]?.message}
        placeholder={label}
        helperText={errors[dataName]?.message as string}
        slotProps={{
          input: {
            inputProps: { "data-testid": dataTestId },
            endAdornment:
              isPasswordType(type) &&
              renderVisibilityComponent(visibility, toggleVisibility),
          },
        }}
      />
    </Box>
  );
}
