import { motion } from "framer-motion";
import Image from "next/image";
import CarImage from "@/public/car.png";

function Car() {
  return (
    <>
      {/* PATH LINE */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", type: "spring" }}
        className="absolute h-1 w-full bg-black-primary bottom-[40%] origin-left"
      />

      {/* CAR */}
      <motion.div
        initial={{ x: "-1000px" }}
        animate={{ x: 0 }}
        transition={{ duration: 4, ease: "easeOut", type: "spring" }}
        className="w-[150px] h-auto absolute bottom-[33%]"
      >
        <Image src={CarImage} alt="Carro" />
      </motion.div>
    </>
  );
}

export default Car;
