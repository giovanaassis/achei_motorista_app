import { AvailabilityType } from "./availability";
import { UserType } from "./user";

export type DriverType = {
  id: number;
  documentId: number;
  gender: "homem" | "mulher" | "outro";
  phone_number: string;
  vehicle_type: "carro" | "moto";
  vehicle_seats?: number;
  state: string;
  city: string;
  driver_availability: AvailabilityType[];
  driver_socials?: {
    social: "instagram" | "facebook" | "site";
    url: string;
    driver: number;
  }[];
  user: UserType;
};
