import { MinusIcon, PlusIcon, SearchIcon } from "lucide-react";
import React from "react";

function SearchFilters() {
  return (
    <div className="my-10 text-xl">
      {/* FIRST PART */}
      <div className="flex flex-col w-[50%] gap-5 mb-5 md:flex-row">
        <div>
          <label htmlFor="user-state" />
          <select className="input h-10">
            <option value="rio">Rio de Janeiro</option>
            <option value="sao-paulo">São Paulo</option>
          </select>
        </div>

        <div>
          <label htmlFor="user-city" />
          <select className="input h-10" id="user-city">
            <option value="nova-iguacu">Nova Iguaçu</option>
            <option value="caxias">Caxias</option>
          </select>
        </div>

        {/* SUBMIT BUTTON FOR BIG SCREENS */}
        <button type="submit" className="w-10 hidden md:block">
          <SearchIcon />
        </button>
      </div>

      {/* SECOND PART */}
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex gap-x-10">
          <div className="flex flex-col">
            <label htmlFor="vehicle">Tipo de veículo:</label>
            <select className="input h-10 mt-4 w-30" id="vehicle">
              <option value="car">Carro</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="gender">Gênero:</label>
            <select className="input h-10 mt-4 w-30" id="gender">
              <option value="man">Homem</option>
              <option value="woman">Mulher</option>
              <option value="other">Outro</option>
            </select>
          </div>
        </div>

        <div className="self-start pt-1">
          <label htmlFor="number-seats">Quantidade de assentos:</label>
          <div className="flex gap-x-5 mt-5 items-center">
            <MinusIcon className="icons" />
            <span id="number-seats" className="text-2xl font-bold text-black">
              2
            </span>
            <PlusIcon className="icons" />
          </div>
        </div>

        {/* SUBMIT BUTTON FOR MOBILE */}
        <button type="submit" className="w-[50%] md:hidden">
          buscar
        </button>
        
      </div>
    </div>
  );
}

export default SearchFilters;
