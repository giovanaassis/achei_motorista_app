import { DriverType } from "@/app/_types/driver";
import SearchFilters from "@/app/(main)/_components/SearchFilters";
import { Suspense } from "react";
import DriversList from "../_components/DriversList";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const filters = Object.entries(await searchParams).map((params) => {
    return { key: params[0] as keyof DriverType, value: params[1] };
  });
  const query = new URLSearchParams();

  if (filters.length > 0) {
    filters.forEach(({ key, value }) => {
      query.append(`filters[${key}][$eq]`, value);
    });
  }

  const filteredState = filters.find((filter) => filter.key === "state")?.value;
  const filteredCity = filters.find((filter) => filter.key === "city")?.value;

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
      <Suspense
        fallback={
          <div className="text-xl mt-10">
            Carregando motoristas. (Pode demorar um pouco ao iniciar. Aguarde
            alguns instantes...)
          </div>
        }
      >
        <DriversList query={query.toString()} />
      </Suspense>
    </section>
  );
}
