import { Box, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

export default function Outlay({ children }: { children?: ReactNode }) {
  const outlayStyles = {
    background: "red",
    display: "flex",
    width: "100vw",
    height: "100vh",
  };
  return (
    <Box sx={outlayStyles}>
      <CssBaseline />
      {children}
    </Box>
  );
}
