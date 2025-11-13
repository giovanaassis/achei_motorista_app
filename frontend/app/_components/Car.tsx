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
        className="relative h-1 top-20 w-full bg-black-primary origin-left flex items-center justify-center"
      >
        {/* CAR IMAGE*/}
        <motion.div
          initial={{ x: "-1000px" }}
          animate={{ x: 0 }}
          transition={{ duration: 4, ease: "easeOut", type: "spring" }}
          className="w-[150px] h-auto absolute -top-25"
        >
          <Image src={CarImage} alt="Carro" priority />
        </motion.div>
      </motion.div>
    </>
  );
}

export default Car;
