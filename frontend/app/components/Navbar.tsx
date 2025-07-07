"use client";

import { MenuIcon, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="flex items-center justify-between p-5">
      <div className="text-4xl md:text-7xl text-black-primary">
        AcheiMotorista
      </div>

      <div className="hidden md:block">
        <span className="underline-animation mr-10 text-xl">
          Encontrar motoristas
        </span>
        <button>cadastre-se como motorista</button>
      </div>

      {/* MENU MOBILE */}
      <button
        className="block md:hidden z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <MenuIcon />}
      </button>

      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center flex-col gap-y-10 z-40 md:hidden">
          <button>encontrar motoristas</button>
          <button>cadastre-se como motorista</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
