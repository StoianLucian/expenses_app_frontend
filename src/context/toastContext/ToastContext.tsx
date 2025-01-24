import { SnackbarCloseReason } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";
import Toast, {
  ToastSeverity,
  ToastVariant,
} from "../../components/toast/Toast";

type ToastHandelerParams = {
  message: string;
  variant?: ToastVariant;
  severity?: ToastSeverity;
};

type ToastContextType = {
  toastHandler: ({ message, variant, severity }: ToastHandelerParams) => void;
};

type ToastType = {
  open: boolean;
  message: string;
  severity: ToastSeverity;
  variant: ToastVariant;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType>({
    open: false,
    message: "",
    severity: ToastSeverity.INFO,
    variant: ToastVariant.FILLED,
  });

  const toastHandler = ({
    message,
    variant = ToastVariant.FILLED,
    severity = ToastSeverity.INFO,
  }: ToastHandelerParams) => {
    setToast({
      open: true,
      message,
      variant,
      severity,
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
