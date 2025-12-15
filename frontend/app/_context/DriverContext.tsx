"use client";

import { DriverType } from "@/app/_types/driver";
import { createContext, ReactNode, useContext, useState } from "react";

type DriverContextType = {
  driver: DriverType | null;
  update: (driver: DriverType) => void;
  clear: () => void;
};

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider = ({
  children,
  initialDriver,
}: {
  children: ReactNode;
  initialDriver: DriverType | null;
}) => {
  const [driver, setDriver] = useState<DriverType | null>(initialDriver);

  const update = (value: DriverType) => {
    setDriver(value);
  };

  const clear = () => {
    setDriver(null);
  };

  return (
    <DriverContext.Provider value={{ driver, update, clear }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriverContext = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error(
      "useDriverContext deve ser usado dentro de um DriverProvider"
    );
  }
  return context;
};
