"use client";

import { DriverType } from "@/app/types/driver";
import ContactForm from "@/app/(main)/_components/ContactForm";
import { useActionState, useEffect, useRef, useState } from "react";
import PersonalForm from "./PersonalForm";
import VehicleForm from "./VehicleForm";
import { useDriverContext } from "@/app/context/DriverContext";
import { DriverFormFields, FormState } from "@/lib/definitions";
import FeedbackMessage from "./FeedbackMessage";

interface EditProfileFormProps {
  driver?: DriverType;
  isUpdating: boolean;
  handleSubmitAction: (
    state: FormState<DriverFormFields>,
    data: FormData
  ) => Promise<{
    success: boolean;
    message?: string;
    errors?: Partial<Record<keyof DriverFormFields, string[]>>;
  }>;
}

function EditProfileForm({
  driver,
  isUpdating,
  handleSubmitAction,
}: EditProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    handleSubmitAction,
    undefined
  );
  const [feedBack, setFeedback] = useState<{
    success: boolean;
    message: string;
  }>();
  const { clear } = useDriverContext();
  const submitRef = useRef(false);

  const handleClientSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (submitRef.current) {
      submitRef.current = false;
      return;
    }

    e.preventDefault();

    const form = e.currentTarget;

    await new Promise((r) => requestAnimationFrame(r));

    const triggers = form.querySelectorAll("[data-radix-select-trigger]");

    const stateTrigger = triggers[0] as HTMLElement | undefined;
    const cityTrigger = triggers[1] as HTMLElement | undefined;

    const stateHidden = form.querySelector(
      "#state-hidden"
    ) as HTMLInputElement | null;

    const cityHidden = form.querySelector(
      "#city-hidden"
    ) as HTMLInputElement | null;

    if (stateTrigger && stateHidden) {
      stateHidden.value = stateTrigger.textContent?.trim() ?? "";
    }

    if (cityTrigger && cityHidden) {
      cityHidden.value = cityTrigger.textContent?.trim() ?? "";
    }

    submitRef.current = true;

    form.requestSubmit();
  };

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

  useEffect(() => {
    if (!state) return;
    if (state.errors) return;

    if (state?.success !== undefined) {
      sessionStorage.setItem(
        "feedback",
        JSON.stringify({
          success: state.success,
          message: state.message ?? "",
        })
      );

      window.location.reload();
    }
  }, [state]);

  useEffect(() => {
    const stored = sessionStorage.getItem("feedback");

    if (stored) {
      setFeedback(JSON.parse(stored));
      sessionStorage.removeItem("feedback");
    }
  }, []);

  return (
    <form
      className="flex justify-between flex-col md:flex-row"
      action={formAction}
      onSubmit={handleClientSubmit}
    >
      {/* LEFT SIDE */}
      <div className="flex-1">
        {feedBack && (
          <FeedbackMessage
            isSuccess={feedBack.success}
            message={feedBack.message}
          />
        )}
        <PersonalForm driver={driver} state={state} />
        <ContactForm driver={driver} state={state} />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 mt-5">
        <VehicleForm driver={driver} state={state} />
        <div className="flex gap-5">
          <button type="submit" className="mt-10 text-2xl">
            {isUpdating
              ? pending
                ? "Salvando..."
                : "Salvar"
              : pending
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
