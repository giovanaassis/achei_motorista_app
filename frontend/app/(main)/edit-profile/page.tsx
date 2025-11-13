"use client";

import { AvailabilityType } from "@/@types/availability";
import { DriverType } from "@/@types/driver";
import { UserType } from "@/@types/user";
import ContactForm from "@/app/_components/ContactForm";
import ProfileForm from "@/app/_components/ProfileForm";
import VehicleForm from "@/app/_components/VehicleForm";
import { useDriverContext } from "@/app/context/DriverContext";
import { getDriver, updateDriver } from "@/app/services/driverService";
import { getMe } from "@/app/services/userService";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function EditProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [driverDraft, setDriverDraft] = useState<DriverType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { driver, update } = useDriverContext();

  const handleDriverChange = useCallback(
    (name: keyof DriverType, value: string | number | AvailabilityType[]) => {
      setDriverDraft((prev) => ({
        ...prev!,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (driverDraft) {
      const res = await updateDriver(driverDraft); // UPDATES IN BACKEND
      if (!res) {
        alert("Algo deu errado! Tente novamente.");
        return;
      }
      update(driverDraft); // UPDATES IN CONTEXT
      alert("Motorista atualizado com sucesso!");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    router.push("search");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("signin");

    if (driver) {
      setDriverDraft(driver);
      setLoading(false);
      return;
    }

    // GET AUTHENTICATED USER
    getMe()
      .then((userData: UserType) => {
        setUser(userData);
        getDriver(userData.id!, update).then((res) => {
          setDriverDraft(res);
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [driver, router, update]);

  if (loading) {
    return <h1>Carregando dados...</h1>;
  }

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl">Olá, {user?.name}</h1>
      <p className="text-xl">
        Edite as informações do seu veículo e do seu perfil aqui.
      </p>

      <form
        className="flex justify-between flex-col md:flex-row"
        onSubmit={handleSubmit}
      >
        {/* LEFT SIDE */}
        <div className="flex-1">
          <ProfileForm
            driver={driverDraft}
            onChangeDriver={handleDriverChange}
          />
          <ContactForm
            driver={driverDraft}
            onChangeDriver={handleDriverChange}
          />
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-1">
          <VehicleForm
            driver={driverDraft}
            onChangeDriver={handleDriverChange}
          />
          <div className="flex gap-5">
            <button type="submit" className="mt-10 text-2xl">
              salvar
            </button>
            <button
              type="button"
              className="bg-white text-black border-2 mt-10 text-xl hover:bg-black-primary hover:text-white transition-colors duration-100"
              onClick={handleLogout}
            >
              sair da conta
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
