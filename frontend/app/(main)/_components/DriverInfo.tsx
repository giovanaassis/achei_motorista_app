"use client";

import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { DriverType } from "@/@types/driver";
import { useEffect, useState } from "react";
import { getMe } from "@/app/services/userService";
import { UserType } from "@/@types/user";

function DriverInfo({ driver }: { driver: DriverType }) {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser: UserType = await getMe();
      if (!currentUser) return;
      const userId = currentUser.id;

      if (driver.user.id === userId) {
        setIsOwner(true);
      }
    };
    checkUser().finally(() => setLoading(false));
  }, [driver.user.id]);

  const { user, city, vehicle_seats, vehicle_type, gender } = driver;
  const formatAvailability = (availability: undefined | string | string[]) => {
    const clean = (value: string) => value.replace(/^"|"$/g, "").trim();
    if (!availability) return [];

    if (Array.isArray(availability)) return availability.map(clean);

    if (typeof availability === "string") return [clean(availability)];
  };

  const availability = formatAvailability(driver.driver_availability);

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="flex gap-10 flex-col lg:flex-row lg:gap-30 capitalize">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-5xl">{user?.name || "Sem nome"}</h2>
        {isOwner ? (
          <div className="flex flex-col gap-5 justify-center items-center">
            <Link href={"/edit-profile"}>
              <button className="bg-blue-700 hover:bg-blue-800 text-lg">
                editar perfil
              </button>
            </Link>

            <Link href={"/edit-account"}>
              <button className="bg-blue-700 hover:bg-blue-800 text-lg w-40">
                editar conta
              </button>
            </Link>
          </div>
        ) : (
          <p className="text-gray-400 italic">Perfil público</p>
        )}
      </div>

      <div className="flex flex-col text-center gap-5 lg:text-left">
        <div className="flex flex-col items-center gap-3 lg:flex-row">
          <FaMapMarkerAlt className="text-gray-primary" />
          <span>{city || "Cidade indefinida"}</span>
        </div>
        <div className="flex flex-col gap-5">
          <span>Gênero: {gender || "indefinido"}</span>
          {vehicle_type === "moto" ? (
            <span>Moto</span>
          ) : (
            <span>Carro: {vehicle_seats} assentos</span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <p className="mb-5">Disponível em:</p>
          {availability?.map((day) => (
            <span className="badge" key={day}>
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DriverInfo;
