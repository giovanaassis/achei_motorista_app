"use client";

import { DriverType } from "@/app/@types/driver";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";

type DriverSocialType = {
  instagram?: string;
  facebook?: string;
  site?: string;
};

function ContactForm({ driver }: { driver?: DriverType }) {
  const [socials, setSocials] = useState<DriverSocialType>();

  useEffect(() => {
    if (!driver?.driver_socials) return;

    setSocials({
      instagram:
        driver.driver_socials.find((s) => s.social === "instagram")?.url || "",
      facebook:
        driver.driver_socials.find((s) => s.social === "facebook")?.url || "",
      site: driver.driver_socials.find((s) => s.social === "site")?.url || "",
    });
  }, [driver]);

  return (
    <>
      <div className="flex flex-col gap-5 mt-5">
        <label htmlFor="phone_number" className="text-2xl self-start">
          Contato
        </label>
        <input
          type="text"
          name="phone_number"
          id="phone_number"
          className="input self-start p-2 text-xl"
          placeholder="Telefone"
          defaultValue={driver?.phone_number}
        />
      </div>

      <p className="text-2xl self-start my-5">
        Redes Sociais (não é obrigatório)
      </p>
      <div className="flex flex-col gap-7">
        <div className="self-start relative -mb-3">
          <AiFillInstagram className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
          <input
            type="text"
            id="instagram"
            name="instagram"
            className="input p-2 pl-12 text-xl bg-transparent"
            placeholder="instagram"
            defaultValue={socials?.instagram}
          />
          <aside
            className="text-gray-900 float-right mt-3 pl-2 cursor-pointer"
            title="Digite seu nome de usuário."
          >
            <AlertCircle />
          </aside>
        </div>
        <div className="self-start relative -mb-3">
          <FaFacebook className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
          <input
            type="text"
            id="facebook"
            name="facebook"
            className="input p-2 pl-12 text-xl bg-transparent"
            placeholder="facebook"
            defaultValue={socials?.facebook}
          />
          <aside
            className="text-gray-900 float-right mt-3 pl-2 cursor-pointer"
            title="Cole o link da sua página do Facebook."
          >
            <AlertCircle />
          </aside>
        </div>
        <div className="self-start relative">
          <IoIosGlobe className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
          <input
            type="text"
            id="site"
            name="site"
            className="input p-2 pl-12 text-xl bg-transparent"
            placeholder="site pessoal"
            defaultValue={socials?.site}
          />
        </div>
      </div>
    </>
  );
}

export default ContactForm;
