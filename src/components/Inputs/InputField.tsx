import { Box, TextField } from "@mui/material";
import Error from "../error/Error";
import { useFormContext } from "react-hook-form";
import { ERRORS } from "../../assets/commons/text";

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
  watchedInput?: string | undefined;
};

export default function InputField({
  label,
  type,
  variant,
  required = false,
  dataName,
  watchedInput = undefined,
}: InputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  function capitalizeFirstLetter(string: string | undefined) {
    if (!string?.trim()) return;

    const label = `${string.charAt(0).toLocaleUpperCase()}${string.slice(1)}`;

    return label;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        marginBottom: 3,
      }}
    >
      <TextField
        {...register(`${dataName}`, {
          required: { value: required, message: `${capitalizeFirstLetter(label)} is required` },
          validate: (value) => {
            const inputValue = value.trim();

            if (watchedInput) {
              return value === watch(watchedInput) || ERRORS.PSW_NO_MATCH;
            }

            if (inputValue.length === 0 && required) {
              return ERRORS.FIELD_EMPTY(capitalizeFirstLetter(label));
            }
          },
        })}
        variant={variant}
        label={capitalizeFirstLetter(label)}
        type={type}
        error={!!errors[label]?.message}
        placeholder={capitalizeFirstLetter(label)}
      />
      <Error errorMessage={errors[dataName]?.message as string | undefined} />
    </Box>
  );
}
