"use client";

import { SearchIcon } from "lucide-react";
import QuantityInput from "./QuantityInput";
import LocaleInput from "./LocaleInput";
import { DriverType } from "@/@types/driver";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SearchFilters({
  state,
  city,
}: {
  state?: string | null;
  city?: string | null;
}) {
  const [driver, setDriver] = useState<DriverType | undefined>();
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const router = useRouter();

  const onChangeDriver = useCallback(
    (name: keyof DriverType, value: string | number) => {
      setDriver((prev) => ({
        ...prev!,
        [name]: value,
      }));
    },
    []
  );

  useEffect(() => {
    if (state) {
      setSelectedState(state);
    }
    if (city) {
      setSelectedCity(city);
    }
  }, [city, state]);

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    setSelectedCity(undefined);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedState) params.append("state", selectedState);
    if (selectedCity && selectedState) params.append("city", selectedCity);
    if (driver?.vehicle_type)
      params.append("vehicle_type", driver.vehicle_type);
    if (driver?.gender) params.append("gender", driver.gender);
    if (driver?.vehicle_seats !== undefined && driver.vehicle_type === "carro")
      params.append("vehicle_seats", String(driver.vehicle_seats));

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  const resetFilters = () => {
    setSelectedState(undefined);
    setSelectedCity(undefined);
    setDriver(undefined);
    router.push("/search");
  };

  return (
    <div className="my-10 text-xl">
      {/* FIRST PART */}
      <div className="flex flex-col w-[50%] gap-5 mb-5 md:flex-row">
        <div>
          <LocaleInput
            hasState={false}
            selectedState={selectedState}
            setSelectedState={handleStateChange}
          />
        </div>

        <div>
          <LocaleInput
            hasState={true}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>

        {/* SUBMIT BUTTON FOR BIG SCREENS */}
        <Link href={`/search${handleSearch()}`}>
          <button type="button" className="w-10 hidden md:block md:mt-1">
            <SearchIcon />
          </button>
        </Link>
      </div>

      {/* SECOND PART */}
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex gap-x-10">
          <div className="flex flex-col">
            <label htmlFor="vehicle">Tipo de veículo:</label>
            <select
              className="input h-10 mt-4 w-30"
              id="vehicle"
              value={driver?.vehicle_type || ""}
              onChange={(e) => onChangeDriver("vehicle_type", e.target.value)}
            >
              <option value="">Todos</option>
              <option value="carro">Carro</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="gender">Gênero:</label>
            <select
              className="input h-10 mt-4 w-30"
              id="gender"
              value={driver?.gender || ""}
              onChange={(e) => onChangeDriver("gender", e.target.value)}
            >
              <option value="">Todos</option>
              <option value="homem">Homem</option>
              <option value="mulher">Mulher</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>

        <div className="self-start pt-1">
          <p>Quantidade de assentos:</p>
          <QuantityInput seats={driver?.vehicle_seats} />
        </div>

        {/* SUBMIT BUTTON FOR MOBILE */}
        <Link href={`/search${handleSearch()}`}>
          <button type="button" className="w-[50%] md:hidden">
            buscar
          </button>
        </Link>

        <button
          className="w-[50%] md:w-[170px] md:h-fit md:self-end"
          onClick={resetFilters}
        >
          limpar filtros
        </button>
      </div>
    </div>
  );
}

export default SearchFilters;
