"use client";

import { DriverType } from "@/@types/driver";
import { API_URL } from "@/app/axios/config";
import DriverCard from "@/app/components/DriverCard";
import SearchFilters from "@/app/components/SearchFilters";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type DriverCardType = DriverType & {
  city_id: { id: number; name: string };
};

export type InputType = {
  id: number;
  name: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [drivers, setDrivers] = useState<DriverCardType[] | undefined>();
  const [filteredState, setFilteredState] = useState<InputType | undefined>();
  const [filteredCity, setFilteredCity] = useState<InputType | undefined>();

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      const params = Object.fromEntries(searchParams.entries());

      const query = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== "undefined" && value !== "") {
            query.append(`filters[${key}][$eq]`, value);
          }
        });
      }

      try {
        const res = await axios.get(
          `${API_URL}/drivers?${query.toString()}&populate[user][fields]=name&populate[state_id][fields]=name&populate[city_id][fields]=name`
        );
        setDrivers(res.data.data);

        // GET STATE AND CITY NAME
        const state_id = searchParams.get("state_id");
        const city_id = searchParams.get("city_id");

        if (state_id !== "" && state_id !== "undefined" && state_id !== null) {
          const stateRes = await axios.get(
            `${API_URL}/states?filters[id][$eq]=${state_id}`
          );
          setFilteredState(stateRes.data.data[0]);
        }

        if (city_id !== "" && city_id !== "undefined" && city_id !== null) {
          const cityRes = await axios.get(
            `${API_URL}/cities?filters[id][$eq]=${city_id}`
          );
          setFilteredCity(cityRes.data.data[0]);
        }
      } catch (error) {
        console.log("Error at fetchDrivers: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [searchParams]);

  return (
    <section className="text-black-primary pl-10 py-10 w-[90%]">
      {filteredCity ? (
        <h1 className="text-3xl">
          Motoristas em &quot;{filteredCity.name}&quot;
        </h1>
      ) : filteredState ? (
        <h1 className="text-3xl">
          Motoristas em &quot;{filteredState.name}&quot;
        </h1>
      ) : (
        <h1 className="text-3xl">Todos os Motoristas</h1>
      )}

      {/* SEARCH SECTION */}
      <SearchFilters state={filteredState} city={filteredCity} />

      {/* DRIVERS SECTION */}
      <div className="my-15 flex flex-col gap-10">
        {loading && <p>Carregando motoristas...</p>}
        {!loading && drivers?.length === 0 && (
          <p>Nenhum motorista encontrado.</p>
        )}
        {drivers?.map((driver) => (
          <DriverCard
            key={driver.id}
            driver={driver}
            state={filteredState?.name}
            city={filteredCity?.name}
          />
        ))}
      </div>
    </section>
  );
}
