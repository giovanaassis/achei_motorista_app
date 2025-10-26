"use client";

import { IoLogoWhatsapp, IoLogoInstagram } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import DriverInfo from "@/app/components/DriverInfo";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/app/axios/config";
import { DriverCardType } from "../../search/page";
import { formatPhone } from "@/lib/formatPhone";

export default function ProfilePage() {
  const { id } = useParams();
  const [driver, setDriver] = useState<DriverCardType>();

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/drivers?filters[id][$eq]=${id}&populate[0]=user&populate[1]=city_id&populate[2]=driver_availability`
        );

        if (res.data.data.length > 0) {
          setDriver(res.data.data[0]);
        } else {
          alert("Erro ao buscar motorista!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDriver();
  }, [id]);

  return (
    <section className="flex flex-col items-center justify-center py-10 text-2xl text-black-primary lg:flex-row lg:justify-around lg:items-start">
      {/* DRIVER INFO */}
      <DriverInfo driver={driver} />

      {/* DRIVER CONTACT */}
      <div className="flex flex-col items-center mt-15 lg:items-start lg:mt-0">
        <p className="mb-10">Entre em contato:</p>
        <div className="flex flex-col gap-8 mb-10">
          <div className="flex gap-5 items-center">
            <IoLogoWhatsapp size={40} color="#22b45a" />
            <span>{formatPhone(driver?.phone_number || "") || "(xx) xxxx-xxxx"}</span>
          </div>
          <div className="flex gap-5 items-center">
            <CgWebsite size={40} color="blue" />
            <span>
              {driver?.driver_socials?.find((s) => s.social === "site")?.url ||
                "Não tem site."}
            </span>
          </div>
          <div className="flex gap-5 items-center">
            <IoLogoInstagram size={40} color="purple" />
            <span>
              {driver?.driver_socials?.find((s) => s.social === "instagram")
                ?.url || "Não tem instagram."}
            </span>
          </div>
        </div>

        <button className="self-center">agenda sua viagem agora</button>
      </div>
    </section>
  );
}
