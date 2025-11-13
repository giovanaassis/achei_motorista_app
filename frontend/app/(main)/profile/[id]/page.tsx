"use client";

import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import DriverInfo from "@/app/_components/DriverInfo";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/app/axios/config";
import { getMe } from "@/app/services/userService";
import { DriverType } from "@/@types/driver";

export default function ProfilePage() {
  const { id } = useParams();
  const [selectedDriver, setSelectedDriver] = useState<DriverType>();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const facebook = selectedDriver?.driver_socials?.find(
    (s) => s.social === "facebook"
  )?.url;
  const instagram = selectedDriver?.driver_socials?.find(
    (s) => s.social === "instagram"
  )?.url;
  const site = selectedDriver?.driver_socials?.find(
    (s) => s.social === "site"
  )?.url;

  const handleWhatsappMessage = () => {
    if (!selectedDriver?.phone_number) {
      alert("Esse motorista não tem contato de telefone.");
      return;
    }
    const message =
      "Olá, tudo bem? Vim do site AcheiMotorista e gostaria de agendar uma viagem particular!";
    const url = `https://wa.me/55${
      selectedDriver?.phone_number
    }?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        let userId;
        if (token) {
          const data = await getMe();
          userId = data.id;
        }

        const res = await axios.get(
          `${API_URL}/drivers?filters[id][$eq]=${id}&populate[0]=user&populate[1]=driver_availability&populate[2]=driver_socials`
        );

        if (res.data.data.length > 0) {
          setSelectedDriver(res.data.data[0]);
          const driverId = res.data.data[0]?.user?.id;
          if (driverId && driverId === userId) {
            setIsOwner(true);
          }
        } else {
          alert("Erro ao buscar motorista!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className="flex flex-col items-center justify-center py-10 text-2xl text-black-primary lg:flex-row lg:justify-around lg:items-start">
      {/* DRIVER INFO */}
      <DriverInfo driver={selectedDriver} isOwner={isOwner} />

      {/* DRIVER CONTACT */}
      <div className="flex flex-col items-center mt-15 lg:items-start lg:mt-0">
        <p className="mb-10">Entre em contato:</p>
        <div className="flex flex-col gap-8 mb-10">
          <div className="flex gap-5 items-center">
            <IoLogoFacebook size={40} color="darkblue" />
            <a href={facebook || ""} target="_blank" rel="noopener noreferrer">
              {facebook ? "Ver facebook" : "Não tem facebook"}
            </a>
          </div>

          <div className="flex gap-5 items-center">
            <CgWebsite size={40} color="green" />
            <a
              href={site ? site : ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site ? `Site de ${selectedDriver.user.name}` : "Não tem site"}
            </a>
          </div>
          <div className="flex gap-5 items-center">
            <IoLogoInstagram size={40} color="purple" />
            <a
              href={instagram ? `https://instagram.com/${instagram}` : ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              {instagram || "Não tem instagram."}
            </a>
          </div>
        </div>

        <button className="self-center" onClick={handleWhatsappMessage}>
          agenda sua viagem agora
        </button>
      </div>
    </section>
  );
}
