import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

type FormProps = {
  submitHandler: () => void;
  children: ReactNode;
  styles?: SxProps;
};

export default function Form({ submitHandler, children, styles }: FormProps) {
  return (
    <Box component="form" onSubmit={submitHandler} sx={styles}>
      {children}
    </Box>
  );
}
