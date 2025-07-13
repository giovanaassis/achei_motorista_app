import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";

function ContactForm() {
  return (
    <>
      <label
        htmlFor="driver-phone-number"
        className="text-3xl self-start -mb-3"
      >
        Contato
      </label>
      <input
        type="text"
        name="driver-phone-number"
        id="driver-phone-number"
        className="input self-start p-2 text-xl"
        placeholder="Telefone"
      />

      <p className="text-3xl self-start">Redes Sociais (não é obrigatório)</p>
      <div className="self-start relative -mb-3">
        <AiFillInstagram className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
        <input
          type="text"
          id="driver-instagram"
          className="input p-2 pl-12 text-xl"
          placeholder="instagram"
        />
      </div>

      <div className="self-start relative -mb-3">
        <FaFacebook className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
        <input
          type="text"
          id="driver-instagram"
          className="input p-2 pl-12 text-xl"
          placeholder="facebook"
        />
      </div>

      <div className="self-start relative">
        <IoIosGlobe className="text-3xl text-gray-secondary absolute top-2 left-2 opacity-75" />
        <input
          type="text"
          id="driver-instagram"
          className="input p-2 pl-12 text-xl"
          placeholder="site pessoal"
        />
      </div>
    </>
  );
}

export default ContactForm;
