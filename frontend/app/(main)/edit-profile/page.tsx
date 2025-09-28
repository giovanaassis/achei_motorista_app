"use client";

import { DriverType } from "@/@types/driver";
import { UserType } from "@/@types/user";
import ContactForm from "@/app/components/ContactForm";
import ProfileForm from "@/app/components/ProfileForm";
import VehicleForm from "@/app/components/VehicleForm";
import { createDriver, getDriver } from "@/app/services/driverService";
import { getMe } from "@/app/services/userService";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";


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
    <div className="p-10 w-full">
      <h1 className="text-3xl">Olá, {user?.name}</h1>
      <p className="text-xl">Edite as informações do seu veículo e do seu perfil aqui.</p>

      <form className="flex justify-between">
        {/* LEFT SIDE */}
       <div className="flex-1">
         <ProfileForm />
         <ContactForm />
       </div>
       {/* RIGHT SIDE */}
       <div className="flex-1">
        <VehicleForm />
        <button type="submit" className="mt-10 text-2xl">salvar</button>
       </div>
      </form>
    </div>
  );
}
