import { DriverType } from "@/@types/driver";
import { API_URL } from "@/app/axios/config";
import { verifySession } from "@/lib/session";
import EditProfileForm from "../_components/EditProfileForm";
import {
  createDriver,
  getDriver,
  updateDriver,
} from "@/app/_actions/driverActions";

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

  const handleSubmit = async (formData: FormData) => {
    "use server";

    let response;
    if (isUpdating && driver) {
      formData.append("driverId", driver.documentId);
      response = await updateDriver(formData);
    } else {
      formData.append("user", session.id);
      response = await createDriver(formData);
    }
    if (response.success) {
      getDriver(response.driverId);
    }
  };

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl">Olá, {session.name}</h1>
      <p className="text-xl">
        Edite as informações do seu veículo e do seu perfil aqui.
      </p>
      <EditProfileForm
        driver={driver}
        isUpdating={isUpdating}
        handleSubmitAction={handleSubmit}
      />
    </div>
  );
}
