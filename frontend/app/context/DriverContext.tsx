"use client";

import { DriverType } from "@/@types/driver";
import { createContext, ReactNode, useContext, useState } from "react";

type DriverContextType = {
  driver: DriverType | null;
  updateDriver: (driver: DriverType) => void;
};

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider = ({ children }: { children: ReactNode }) => {
  const [driver, setDriver] = useState<DriverType | null>(null);

  const updateDriver = (value: DriverType) => {
    setDriver(value);
  };

  return (
    <DriverContext.Provider value={{ driver, updateDriver }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriverContext = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error("useDriverContext deve ser usado dentro de um DriverProvider");
  }
  return context;
};
