import { SocialType } from "./social";
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
  driver_availability: string[];
  driver_socials?: SocialType[];
  user: UserType;
};
