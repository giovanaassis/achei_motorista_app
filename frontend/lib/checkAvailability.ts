import { DriverType } from "@/app/@types/driver";

export const checkAvailability = (driver: DriverType) => {
  let { driver_availability } = driver;
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
  if (typeof driver_availability === "string") {
    driver_availability = [driver_availability];
  }

  return driver_availability.some((day) => today === day);
};
