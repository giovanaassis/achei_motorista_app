"use client";

// 3 SITUATIONS
// 1 - User signup for the first time and create a driver. Saves context.
// 2 - User log in and get driver. Saves context.
// 3 - Logged user get out, calls user and driver. Saves context.

import { DriverType } from "@/@types/driver";
import { UserType } from "@/@types/user";
import ContactForm from "@/app/components/ContactForm";
import ProfileForm from "@/app/components/ProfileForm";
import VehicleForm from "@/app/components/VehicleForm";
import { useDriverContext } from "@/app/context/DriverContext";
import { getDriver } from "@/app/services/driverService";
import { getMe } from "@/app/services/userService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [driverDraft, setDriverDraft] = useState<DriverType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { driver, updateDriver } = useDriverContext();

  const handleDriverChange = (name: keyof DriverType, value: string) => {
    setDriverDraft((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("signin");

    if (driver) {
      setDriverDraft(driver);
      console.log("tem context");
      return;
    }

    // GET AUTHENTICATED USER
    getMe()
      .then((userData: UserType) => {
        setUser(userData);
        getDriver(userData.id!, updateDriver).then((res) => setDriverDraft(res));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [driver, router, updateDriver]);

  if (loading) {
    return <h1>Carregando dados...</h1>;
  }

  console.log(driver);

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl">Olá, {user?.name}</h1>
      <p className="text-xl">
        Edite as informações do seu veículo e do seu perfil aqui.
      </p>

      <form className="flex justify-between">
        {/* LEFT SIDE */}
        <div className="flex-1">
          <ProfileForm />
          <ContactForm
            driver={driverDraft}
            onChangeDriver={handleDriverChange}
          />
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-1">
          <VehicleForm />
          <button type="submit" className="mt-10 text-2xl">
            salvar
          </button>
        </div>
      </form>
    </div>
  );
}
