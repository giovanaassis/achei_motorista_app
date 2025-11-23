"use client";

import { DriverType } from "@/@types/driver";
import ContactForm from "@/app/(main)/_components/ContactForm";
import { useTransition } from "react";
import PersonalForm from "./PersonalForm";
import VehicleForm from "./VehicleForm";

function EditProfileForm({
  driver,
  isUpdating,
  handleSubmitAction,
}: {
  driver?: DriverType;
  isUpdating: boolean;
  handleSubmitAction: (data: FormData) => void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="flex justify-between flex-col md:flex-row"
      action={(formData) => startTransition(() => handleSubmitAction(formData))}
    >
      {/* LEFT SIDE */}
      <div className="flex-1">
        <PersonalForm driver={driver} />
        <ContactForm driver={driver} />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1">
        <VehicleForm driver={driver} />
        <div className="flex gap-5">
          <button type="submit" className="mt-10 text-2xl">
            {isUpdating
              ? isPending
                ? "Salvando..."
                : "Salvar"
              : isPending
              ? "Criando..."
              : "Criar"}
          </button>
          <button
            type="button"
            className="bg-white text-black border-2 mt-10 text-xl hover:bg-black-primary hover:text-white transition-colors duration-100"
            // onClick={handleLogout}
          >
            sair da conta
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
