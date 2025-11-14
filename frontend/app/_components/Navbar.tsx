"use client";

import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDriverContext } from "../context/DriverContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { driver } = useDriverContext();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setUserLogged(!!token);
    };

    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  useEffect(() => {
    // TO ADD THE SHADOW WHEN SCROLL
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between py-5 px-10 fixed w-full top-0 bg-white z-50 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="text-4xl md:text-7xl text-black-primary">
        AcheiMotorista
      </div>

      <div className="hidden md:block">
        <Link href={"/search"}>
          <span className="underline-animation mr-10 text-xl tracking-widest">
            Encontrar motoristas
          </span>
        </Link>

        {userLogged ? (
          <Link href={`/profile/${driver?.id}`}>
            <button>Ver perfil</button>
          </Link>
        ) : (
          <Link href={"/signup"}>
            <button>cadastre-se como motorista</button>
          </Link>
        )}
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
          <Link href={`/search`}>
            <button>encontrar motoristas</button>
          </Link>
          {userLogged ? (
            <Link href={`/profile/${driver?.id}`}>
              <button>Ver perfil</button>
            </Link>
          ) : (
            <Link href={"/signup"}>
              <button>cadastre-se como motorista</button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
