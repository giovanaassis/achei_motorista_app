import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { DriverCardType } from "../(main)/search/page";

function DriverInfo({
  driver,
  isOwner,
}: {
  driver: DriverCardType | undefined;
  isOwner: boolean;
}) {
  if (!driver) {
    return <p>Buscando dados do motorista.</p>;
  }

  const {
    user,
    city_id,
    vehicle_seats,
    vehicle_type,
    gender,
    driver_availability,
  } = driver;

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
          <span>{city_id?.name || "Cidade indefinida"}</span>
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
          {driver_availability.map((day) => (
            <span className="badge" key={day.id}>
              {day.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DriverInfo;
