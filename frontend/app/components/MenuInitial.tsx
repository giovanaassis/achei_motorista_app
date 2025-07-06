import { motion } from "framer-motion";

interface MenuInitialProps {
  onStartSearch: () => void;
}

function MenuInitial({ onStartSearch }: MenuInitialProps) {
  return (
    <div className="flex items-center justify-center flex-col">
      {/* APP TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8, ease: "easeOut" }}
        className="text-7xl text-black-primary"
      >
        AcheiMotorista
      </motion.h1>

      {/* BUTTON CALL TO ACTION */}
      <motion.button
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.8, ease: "easeOut" }}
        className="absolute -top-15"
        onClick={onStartSearch}
      >
        encontre motoristas perto de você
      </motion.button>
    </div>
  );
}

export default MenuInitial;
