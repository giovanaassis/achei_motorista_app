import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaCarSide } from "react-icons/fa";
import { DriverCardType } from "../(main)/search/page";

interface DriverCardProps {
  driver: DriverCardType;
  state?: string;
  city?: string;
}

function DriverCard({ driver, state, city }: DriverCardProps) {
  return (
    <div className="border-2 border-gray-600 w-fit flex items-center justify-around p-5 gap-5 rounded-xl md:w-[70%] lg:w-[50%]">
      {/* DRIVER PROFILE IMAGE */}
      <div className="bg-gray-800 rounded-full w-15 h-15 md:w-25 md:h-25"></div>

      {/* DRIVER INFO */}
      <div className="flex flex-col md:w-[250px]">
        <div className="driver-card-info">
          <h3 className="text-2xl lg:text-3xl">
            {driver?.user?.name || "Sem nome"}
          </h3>
          <FaCarSide className="text-gray-primary my-2 text-2xl" />
        </div>

        <div className="driver-card-info text-lg">
          <span>{driver.city_id.name}</span>
          <span className="text-green">Disponível agora</span>
        </div>
      </div>

      {/* ARROW ICON */}
      <Link href="/profile">
        <ArrowRight className="rounded-full w-8 h-8 hover:bg-gray-500 transition duration-200 cursor-pointer" />
      </Link>
    </div>
  );
}

export default DriverCard;
