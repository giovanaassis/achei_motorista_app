import DriverCard from "@/app/components/DriverCard";
import SearchFilters from "@/app/components/SearchFilters";

export default function SearchPage() {
  return (
    <section className="text-black-primary pl-10 py-10 w-[90%]">
      <h1 className="text-3xl">Motoristas em &quot;Nova Iguaçu&quot;</h1>

      {/* SEARCH SECTION */}
      <SearchFilters />

      {/* DRIVERS SECTION */}
      <div className="my-15 flex flex-col gap-10">
        <DriverCard />
        <DriverCard />
      </div>
    </section>
  );
}
