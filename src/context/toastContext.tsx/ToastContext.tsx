import { Alert } from "@mui/material";
import { SnackbarCloseReason, Snackbar } from "@mui/material";
import React, { createContext, ReactNode, useContext, useState } from "react";

export enum TOAST_VARIANT {
  FILLED = "filled",
  OUTLINED = "outlined",
  STANDARD = "standard",
}

export enum TOAST_SEVERITY {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

type VariantType = TOAST_VARIANT | undefined;
type SeverityType = TOAST_SEVERITY | undefined;

type ToastContextType = {
  toastHandler: (
    variant: VariantType,
    severity: SeverityType,
    message: string
  ) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{
    open: boolean;
    variant: VariantType;
    severity: SeverityType;
    message: string;
  }>({
    open: false,
    variant: undefined,
    severity: undefined,
    message: "",
  });

  const toastHandler = (
    variant: VariantType,
    severity: SeverityType,
    message: string
  ) => {
    setToast({
      open: true,
      variant,
      severity,
      message,
    });
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event, // typescript complains if missing
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToast((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <ToastContext.Provider value={{ toastHandler }}>
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          severity={toast.severity}
          variant={toast.variant}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {toast.message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};

export const UseToastContext = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("UseToastContext must be used inside ToastContextProvider");
  }

  return context;
};
