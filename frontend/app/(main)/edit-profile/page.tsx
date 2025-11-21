import { DriverType } from "@/@types/driver";
import { API_URL } from "@/app/axios/config";
import { verifySession } from "@/lib/session";
import EditProfileForm from "../_components/EditProfileForm";

export default async function EditProfilePage() {
  // CHECK AUTH
  const session = await verifySession();

  // SEE IF IT EXISTS A DRIVER
  const res = await fetch(
    `${API_URL}/drivers?filters[user][id][$eq]=${session.id}&populate=*`,
    { cache: "no-store" }
  );
  const { data } = await res.json();
  let driver: DriverType | undefined = undefined;
  let isUpdating: boolean = false;

  if (data.length > 0) {
    isUpdating = true;
    driver = data[0];
  }

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl">Olá, {session.name}</h1>
      <p className="text-xl">
        Edite as informações do seu veículo e do seu perfil aqui.
      </p>
      <EditProfileForm driver={driver} isUpdating={isUpdating} />
    </div>
  );
}
