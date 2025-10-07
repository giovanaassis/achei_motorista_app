import { DriverType } from "@/@types/driver";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";

interface ContactFormProps {
  driver: DriverType | null;
  onChangeDriver: (name: keyof DriverType, value: string) => void;
}

function ContactForm({ driver, onChangeDriver }: ContactFormProps) {
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
          value={driver?.phone_number}
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
            id="driver-instagram"
            className="input p-2 pl-12 text-xl bg-transparent"
            placeholder="instagram"
          />
        </div>
        <div className="self-start relative -mb-3">
          <FaFacebook className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
          <input
            type="text"
            id="driver-facebook"
            className="input p-2 pl-12 text-xl bg-transparent"
            placeholder="facebook"
          />
        </div>
        <div className="self-start relative">
          <IoIosGlobe className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
          <input
            type="text"
            id="driver-site"
            className="input p-2 pl-12 text-xl bg-transparent"
            placeholder="site pessoal"
          />
        </div>
      </div>
    </>
  );
}

export default ContactForm;
