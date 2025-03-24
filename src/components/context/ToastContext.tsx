import React, { createContext} from "react";
import { toast } from "react-toastify";
import { ReactNode } from "react";

const ToastContext = createContext({ toast: (message: string) => {} });

interface ToastProviderProps {
    children: ReactNode;
  }

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);