import { Snackbar, Alert } from "@mui/material";

export enum ToastSeverity {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

export enum ToastVariant {
  FILLED = "filled",
  OUTLINED = "outlined",
  STANDARD = "standard",
}

type ToastProps = {
  isOpen: boolean;
  closeHandler: () => void;
  severity?: ToastSeverity;
  variant?: ToastVariant;
  message: string;
  closeDelay?: number;
};

export default function Toast({
  isOpen,
  closeHandler,
  severity = ToastSeverity.INFO,
  variant = ToastVariant.FILLED,
  message,
  closeDelay = 3000,
}: ToastProps) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={closeDelay}
      onClose={closeHandler}
    >
      <Alert
        severity={severity}
        variant={variant}
        onClose={closeHandler}
        sx={{ widows: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
