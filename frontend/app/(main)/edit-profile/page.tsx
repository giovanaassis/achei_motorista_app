"use client";

import { UserType } from "@/@types/user";
import { API_URL } from "@/app/axios/config";
import { createDriver, getDriver } from "@/app/services/driverService";
import { getMe } from "@/app/services/userService";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type DriverType = {
  profile_image: string;
  gender: "homem" | "mulher" | "outro";
  phone_number: string;
  vehicle_type: "carro" | "moto";
  vehicle_seats: number;
};

export default function EditProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [driver, setDriver] = useState<DriverType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleDriverChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDriver((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/signin");

    // GET AUTHENTICATED USER
    getMe()
      .then((userData) => {
        setUser(userData);

        // GET DRIVER
        getDriver(userData.id).then((driverData) => {
          if (driverData.length > 0) {
            console.log("Motorista já existe: ", driverData);
            setDriver(driverData[0]);
          } else {
            // CREATE A DRIVER
            console.log("Motorista criado");
            createDriver(userData.id).then((res) => setDriver(res));
          }
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [router]);

  console.log(driver);

  if (loading) {
    return <h1>Carregando dados...</h1>;
  }

  return (
    <div>
      <h1>Olá, {user?.name}</h1>
      <p>Edite as informações do seu veículo e do seu perfil aqui.</p>

      <form>{/* LEFT SIDE */}</form>
    </div>
  );
}
