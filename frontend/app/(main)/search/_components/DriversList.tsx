import { DriverType } from "@/@types/driver";
import { API_URL } from "@/app/axios/config";
import DriverCard from "./DriverCard";

async function DriversList({ query }: { query: string }) {
  const res = await fetch(
    `${API_URL}/drivers?${query}&populate[user][fields]=name&populate=driver_availability`
  );

  const drivers: DriverType[] = (await res.json()).data;
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
