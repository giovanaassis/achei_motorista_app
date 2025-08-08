import Link from "next/link";
import React from "react";

function SearchInputInitial() {
  return (
    <div className="flex items-center flex-col">
      <div className="mt-[20%]">
        {/* STATE INPUT */}
        <div className="flex flex-col text-xl text-center tracking-widest gap-3 mb-10">
          <label htmlFor="user-state">Qual o seu estado?</label>
          <select className="input" id="user-state">
            <option value="rio">Rio de Janeiro</option>
            <option value="sao-paulo">São Paulo</option>
          </select>
        </div>

        {/* CITY INPUT */}
        <div className="flex flex-col text-xl text-center tracking-widest gap-3">
          <label htmlFor="user-city">Qual a sua cidade?</label>
          <select className="input" id="user-city">
            <option value="nova-iguacu">Nova Iguaçu</option>
            <option value="caxias">Caxias</option>
          </select>
        </div>
      </div>

      <Link href={"/search"}>
        <button className="mt-60 md:mt-30">achar motoristas</button>
      </Link>
    </div>
  );
}

export default SearchInputInitial;
