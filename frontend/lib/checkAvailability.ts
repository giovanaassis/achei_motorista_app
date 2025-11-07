import { DriverType } from "@/@types/driver";


export const checkAvailability = (driver: DriverType) => {
  const { driver_availability } = driver;
  const days = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];
  const today = days[new Date().getDay()];

  if (!driver_availability) return false;

  return driver_availability.some((day) => today === day.name);
};
