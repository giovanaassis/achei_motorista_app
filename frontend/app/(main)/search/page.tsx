"use client";

import { DriverType } from "@/@types/driver";
import { API_URL } from "@/app/axios/config";
import DriverCard from "@/app/_components/DriverCard";
import SearchFilters from "@/app/_components/SearchFilters";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>(
    "Carregando motoristas..."
  );
  const [drivers, setDrivers] = useState<DriverType[] | undefined>();
  const [filteredState, setFilteredState] = useState<string | undefined>();
  const [filteredCity, setFilteredCity] = useState<string | undefined>();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setLoadingMessage("Carregando motoristas...");

      timer = setTimeout(() => {
        setLoadingMessage(
          "Pode demorar um pouco ao iniciar. Aguarde alguns instantes..."
        );
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [loading]);

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
          `${API_URL}/drivers?${query.toString()}&populate[user][fields]=name&populate=driver_availability`
        );
        setDrivers(res.data.data);

        // GET STATE AND CITY NAME
        const state = searchParams.get("state");
        const city = searchParams.get("city");

        if (state) setFilteredState(state);
        else setFilteredState(undefined);
        if (city && state) setFilteredCity(city);
        else setFilteredCity(undefined);
      } catch (error) {
        console.log("Error at fetchDrivers: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [filteredCity, filteredState, searchParams]);

  return (
    <section className="text-black-primary pl-10 py-10 w-[90%]">
      {filteredCity ? (
        <h1 className="text-3xl">Motoristas em &quot;{filteredCity}&quot;</h1>
      ) : filteredState ? (
        <h1 className="text-3xl">Motoristas em &quot;{filteredState}&quot;</h1>
      ) : (
        <h1 className="text-3xl">Todos os Motoristas</h1>
      )}

      {/* SEARCH SECTION */}
      <SearchFilters state={filteredState} city={filteredCity} />

      {/* DRIVERS SECTION */}
      <div className="my-15 flex flex-col gap-10">
        {loading && <p>{loadingMessage}</p>}
        {!loading && drivers?.length === 0 && (
          <p>Nenhum motorista encontrado.</p>
        )}
        {drivers?.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
    </section>
  );
}
