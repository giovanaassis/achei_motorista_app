import { DriverType } from "@/app/types/driver";
import { API_URL } from "@/app/config/env";
import { verifySession } from "@/app/utils/session";
import EditProfileForm from "../_components/EditProfileForm";
import { createDriver, updateDriver } from "@/app/actions/driver";
import { DriverFormFields, FormState } from "@/lib/definitions";

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

  const handleSubmit = async (
    state: FormState<DriverFormFields>,
    formData: FormData
  ) => {
    "use server";

    let response;
    if (isUpdating && driver) {
      formData.append("documentId", driver.documentId);
      response = await updateDriver(formData);
    } else {
      formData.append("user", session.id);
      response = await createDriver(formData);
    }

    return response;
  };

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl">Olá, {session.name}</h1>
      <p className="text-xl mb-5">
        Edite as informações do seu veículo e do seu perfil aqui.
      </p>
      <section>
        <EditProfileForm
          driver={driver}
          isUpdating={isUpdating}
          handleSubmitAction={handleSubmit}
        />
      </section>
    </div>
  );
}
