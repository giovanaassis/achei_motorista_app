import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaCarSide, FaMotorcycle } from "react-icons/fa";
import { checkAvailability } from "@/app/_utils/checkAvailability";
import { DriverType } from "@/app/_types/driver";

function DriverCard({ driver }: { driver: DriverType }) {
  return (
    <div className="border-2 border-gray-600 w-[80%] md:w-fit flex items-center justify-around p-5 gap-10 rounded-xl">
      {/* DRIVER INFO */}
      <div className="flex flex-col md:w-[250px]">
        <div className="driver-card-info">
          <h3 className="text-2xl lg:text-3xl capitalize">
            {driver?.user?.name || "Sem nome"}
          </h3>
          {driver.vehicle_type === "moto" ? (
            <FaMotorcycle className="text-gray-primary my-2 text-2xl md:mt-3" />
          ) : (
            <FaCarSide className="text-gray-primary my-2 text-2xl md:mt-3" />
          )}
        </div>

        <div className="driver-card-info text-lg">
          <span>{driver?.city || "Pendente"}</span>
          {checkAvailability(driver) ? (
            <span className="text-green">Disponível agora</span>
          ) : (
            <span className="text-red">Indisponível agora</span>
          )}
        </div>
      </div>

      {/* ARROW ICON */}
      <Link href={`/profile/${driver.id}`}>
        <ArrowRight className="rounded-full w-8 h-8 hover:bg-gray-500 transition duration-200 cursor-pointer" />
      </Link>
    </div>
  );
}

export default DriverCard;
