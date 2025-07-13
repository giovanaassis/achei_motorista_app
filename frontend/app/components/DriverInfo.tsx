import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

function DriverInfo() {
  return (
    <div className="flex gap-10 flex-col md:flex-row md:gap-30">
      <div className="flex flex-col items-center gap-5">
        <div className="w-50 h-50 rounded-full bg-gray-700"></div>
        <h2 className="text-3xl">Roberto Silva</h2>
        <Link href={"/edit-profile"}>
          <button className="bg-blue-700 hover:bg-blue-800 text-lg">
            editar perfil
          </button>
        </Link>
      </div>

      <div className="flex flex-col text-center gap-5 md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <FaMapMarkerAlt className="text-gray-primary" />
          <span>Nova Iguaçu, Brasil</span>
        </div>
        <div className="flex flex-col gap-5">
          <span>Gênero: Homem</span>
          <span>Carro: 4 assentos</span>
        </div>

        <div className="flex flex-col gap-3">
          <p className="mb-5">Disponível em:</p>
          <span className="badge">Segunda-feira</span>
          <span className="badge">Quarta-feira</span>
          <span className="badge">Sexta</span>
          <span className="badge">Sábado</span>
        </div>
      </div>
    </div>
  );
}

export default DriverInfo;
