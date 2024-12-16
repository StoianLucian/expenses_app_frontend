import { Box, TextField } from "@mui/material";
import Error from "../error/Error";
import { useFormContext } from "react-hook-form";

// enum VariantTypes {
//   FILLED = "filled",
//   OUTLINED = "outlined",
//   STANDARD = "standard",
// }

type InputProps = {
  label: string;
  type: string;
  variant: "filled" | "outlined" | "standard";
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
          required: { value: required, message: `${label} is required` },
          validate: (value) => {
            if (watchedInput) {
              return value === watch(watchedInput) || "passwords do not match";
            }
          },
        })}
        variant={variant}
        label={label}
        type={type}
        required={required}
        error={!!errors[label]?.message}
      />
      <Error errorMessage={errors[dataName]?.message as string | undefined} />
    </Box>
  );
}
