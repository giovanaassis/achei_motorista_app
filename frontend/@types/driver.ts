import { UserType } from "./user";

export type DriverType = {
  id: number;
  profile_image: string;
  gender: "homem" | "mulher" | "outro";
  phone_number: string;
  vehicle_type: "carro" | "moto";
  vehicle_seats?: number;
  state_id: number;
  city_id: number;
  driver_availability: string[];
  driver_socials: string[];
  user: UserType;
};