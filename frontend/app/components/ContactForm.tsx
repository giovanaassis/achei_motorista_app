/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DriverType } from "@/@types/driver";
import { useEffect, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";

interface ContactFormProps {
  driver: DriverType | null;
  onChangeDriver: (name: keyof DriverType, value: string) => void;
}

function ContactForm({ driver, onChangeDriver }: ContactFormProps) {
  const [socials, setSocials] = useState({
    instagram: "",
    facebook: "",
    site: "",
  });

  useEffect(() => {
    if (driver?.driver_socials) {
      setSocials({
        instagram:
          driver.driver_socials.find((s) => s.social === "instagram")?.url ||
          "",
        facebook:
          driver.driver_socials.find((s) => s.social === "facebook")?.url || "",
        site: driver.driver_socials.find((s) => s.social === "site")?.url || "",
      });
    }
  }, [driver]);

  function handleChange(value: string, social: keyof typeof socials) {
    const updated = { ...socials, [social]: value };
    setSocials(updated);

    const formatted = Object.entries(updated)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, url]) => url.trim() !== "")
      .map(([social, url]) => ({ social, url }));

    onChangeDriver("driver_socials", formatted as any);
  }

  return (
    <>
      <div className="flex flex-col gap-5 mt-5">
        <label htmlFor="phone_number" className="text-2xl self-start">
          Contato
        </label>
        <input
          type="text"
          name="phone_number"
          className="input self-start p-2 text-xl"
          placeholder="Telefone"
          value={driver?.phone_number || ""}
          onChange={(e) => onChangeDriver("phone_number", e.target.value)}
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
            className="input p-2 pl-12 text-xl bg-transparent"
            placeholder="instagram"
            value={socials.instagram}
            onChange={(e) => handleChange(e.target.value, "instagram")}
          />
        </div>
        <div className="self-start relative -mb-3">
          <FaFacebook className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
          <input
            type="text"
            id="facebook"
            className="input p-2 pl-12 text-xl bg-transparent"
            placeholder="facebook"
            value={socials.facebook}
            onChange={(e) => handleChange(e.target.value, "facebook")}
          />
        </div>
        <div className="self-start relative">
          <IoIosGlobe className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
          <input
            type="text"
            id="site"
            className="input p-2 pl-12 text-xl bg-transparent"
            placeholder="site pessoal"
            value={socials.site}
            onChange={(e) => handleChange(e.target.value, "site")}
          />
        </div>
      </div>
    </>
  );
}

export default ContactForm;
