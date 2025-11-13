"use client";

import { useState } from "react";
import Car from "./_components/Car";
import MenuInitial from "./_components/MenuInitial";
import SearchInputInitial from "./_components/SearchInputInitial";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center overflow-hidden relative">
      <Car />
      <AnimatePresence mode="wait">
        {showSearch ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute top-20"
          >
            <SearchInputInitial />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="absolute top-50"
          >
            <MenuInitial onStartSearch={() => setShowSearch(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
