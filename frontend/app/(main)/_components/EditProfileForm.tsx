"use client";

import { DriverType } from "@/app/@types/driver";
import ContactForm from "@/app/(main)/_components/ContactForm";
import { useState, useTransition } from "react";
import PersonalForm from "./PersonalForm";
import VehicleForm from "./VehicleForm";
import FeedbackMessage from "./FeedbackMessage";
import { useDriverContext } from "@/app/context/DriverContext";

interface EditProfileFormProps {
  driver?: DriverType;
  isUpdating: boolean;
  handleSubmitAction: (
    data: FormData
  ) => Promise<{ success: boolean; message: string; driver?: DriverType }>;
}

function EditProfileForm({
  driver,
  isUpdating,
  handleSubmitAction,
}: EditProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [message, setMessage] = useState<string>("");
  const { update, clear } = useDriverContext();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      clear();
      window.location.href = "/search";
    } else {
      alert(data.message);
    }
  };

  return (
    <form
      className="flex justify-between flex-col md:flex-row"
      action={(formData) =>
        startTransition(async () => {
          const result = await handleSubmitAction(formData);
          setIsSuccess(result.success);
          setMessage(result.message);
          if (result.driver) {
            update(result.driver);
          }
        })
      }
    >
      {/* LEFT SIDE */}
      <div className="flex-1">
        {isSuccess !== undefined && (
          <FeedbackMessage isSuccess={isSuccess} message={message} />
        )}
        <PersonalForm driver={driver} />
        <ContactForm driver={driver} />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 mt-5">
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
            className="bg-white text-black-primary border-2  mt-10 text-xl hover:bg-black-primary hover:text-white transition-colors duration-150"
            onClick={handleLogout}
          >
            sair da conta
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
