import React, { createContext, useState, ReactNode } from 'react';
import Alert from '../../components/common/Alert';

type AlertContextType = {
  showAlert: (message: string, type: 'success' | 'error') => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 6000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert
          open={!!alert}
          onClose={() => setAlert(null)}
          message={alert.message}
          type={alert.type}
        />
      )}
    </AlertContext.Provider>
  );
};
