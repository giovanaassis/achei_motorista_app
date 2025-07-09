import { ArrowRight } from "lucide-react";
import { FaCarSide } from "react-icons/fa";

function DriverCard() {
  return (
    <div className="border-2 border-gray-600 w-fit flex items-center p-5 gap-15 rounded-xl">
      {/* DRIVER PROFILE IMAGE */}
      <div className="rounded-full bg-gray-800 w-15 h-15 md:w-25 md:h-25"></div>
      {/* DRIVER INFO */}
      <div>
        <div className="flex text-2xl items-center justify-between font-bold md:text-3xl">
          <h3>Roberto Silva</h3>
          <FaCarSide className="text-gray-primary" />
        </div>

        <div className="flex items-center justify-between text-gray-primary text-lg gap-x-10 mt-3 md:text-xl">
          <span>Nova Iguaçu</span>
          <span className="text-green">Disponível agora</span>
        </div>
      </div>

      <ArrowRight className="rounded-full w-8 h-8 hover:bg-gray-500 transition duration-200 cursor-pointer"/>
    </div>
  );
}

export default DriverCard;
