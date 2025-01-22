import { Snackbar, Alert } from "@mui/material";

export enum toastSeverity {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

export enum toastVariant {
  FILLED = "filled",
  OUTLINED = "outlined",
  STANDARD = "standard",
}

type toastProps = {
  isOpen: boolean;
  closeHandler: () => void;
  severity: toastSeverity | undefined;
  variant: toastVariant | undefined;
  message: string;
  closeDelay?: number;
};

export default function Toast({
  isOpen,
  closeHandler,
  severity,
  variant,
  message,
  closeDelay = 3000,
}: toastProps) {
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
