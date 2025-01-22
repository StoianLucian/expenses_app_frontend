import { SnackbarCloseReason } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";
import Toast, {
  toastSeverity,
  toastVariant,
} from "../../components/toast/Toast";

type ToastContextType = {
  toastHandler: (
    variant: toastVariant,
    severity: toastSeverity,
    message: string
  ) => void;
};

type toastType = {
  open: boolean;
  message: string;
  severity: toastSeverity | undefined;
  variant: toastVariant | undefined;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<toastType>({
    open: false,
    message: "",
    severity: undefined,
    variant: undefined,
  });

  const toastHandler = (
    variant: toastVariant,
    severity: toastSeverity,
    message: string
  ) => {
    setToast({
      open: true,
      variant,
      severity,
      message,
    });
  };

  const closeHandler = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToast((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <ToastContext.Provider value={{ toastHandler }}>
      <Toast
        isOpen={toast.open}
        severity={toast.severity}
        variant={toast.variant}
        closeHandler={closeHandler}
        message={toast.message}
      />
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
