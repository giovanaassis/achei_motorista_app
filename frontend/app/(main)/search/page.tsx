import SearchFilters from "@/app/components/SearchFilters";

export default function SearchPage() {
  return (
    <section className="text-black-primary pl-10 py-10">
      <h1 className="text-3xl">Motoristas em &quot;Nova Iguaçu&quot;</h1>

      {/* SEARCH SECTION */}
      <SearchFilters />

      {/* DRIVERS SECTION */}
      
    </section>
  );
}
