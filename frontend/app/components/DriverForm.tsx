"use client";

import { useState } from "react";
import SignUpForm from "./SignUpForm";
import ProfileForm from "./ProfileForm";
import ContactForm from "./ContactForm";
import VehicleForm from "./VehicleForm";
import Link from "next/link";
import EditForm from "./EditForm";

function DriverForm({ onEdit }: { onEdit: boolean }) {
  const [formStep, setFormStep] = useState<number>(1);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(formStep + 1);
  };

  const handlePrev = () => {
    setFormStep(formStep - 1);
  };

  if (onEdit) {
    console.log("driver logged in");
  }

  return (
    <form
      className="flex flex-col gap-10 mt-15 items-center justify-center"
      onSubmit={handleNext}
    >
      {formStep === 1 && (onEdit ? <EditForm /> : <SignUpForm />)}
      {formStep == 2 && <ProfileForm />}
      {formStep == 3 && <ContactForm />}
      {formStep == 4 && <VehicleForm />}

      <div className="flex flex-row-reverse gap-10">
        {formStep == 4 ? (
          <button className="w-50">finalizar</button>
        ) : (
          <button className="w-50">próximo</button>
        )}

        {formStep !== 1 && (
          <button className="w-50" type="button" onClick={handlePrev}>
            voltar
          </button>
        )}
      </div>

      {formStep === 1 && !onEdit && (
        <p>
          Já tem uma conta?{" "}
          <Link href={"/signin"}>
            <span className="underline cursor-pointer">Faça login</span>
          </Link>
        </p>
      )}
    </form>
  );
}

export default DriverForm;
