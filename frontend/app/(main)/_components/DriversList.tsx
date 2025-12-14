import { DriverType } from "@/app/@types/driver";
import DriverCard from "@/app/(main)/_components/DriverCard";
import { http } from "@/app/api/http";
import { getErrorMessage } from "@/lib/getErrorMessage";

async function DriversList({ query }: { query: string }) {
  const res = await http(`drivers?populate[user][fields]=name&${query}`, "GET");

  if (!res.ok) {
    return <span>{getErrorMessage(res.status)}</span>;
  }

  const data = await res.json();
  const drivers: DriverType[] = data.data;

  if (!drivers || drivers.length === 0) {
    return <p className="text-xl mt-10">Nenhum motorista encontrado.</p>;
  }

  return (
    <div className="my-15 flex flex-col gap-10">
      {drivers?.map((driver) => (
        <DriverCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
}

export default DriversList;
