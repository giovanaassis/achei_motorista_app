"use client";

import { useState } from "react";
import SignUpForm from "./SignUpForm";
import ProfileForm from "./ProfileForm";
import ContactForm from "./ContactForm";
import VehicleForm from "./VehicleForm";
import Link from "next/link";
import EditAccountForm from "./EditAccountForm";

function DriverForm({ onEdit }: { onEdit: boolean }) {
  const [formStep, setFormStep] = useState<number>(1);

  // const handleNext = () => {
  //   setFormStep(formStep + 1);
  // };

  const handlePrev = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("enviou!")
  };

  return (
    <form
      className="flex flex-col gap-10 mt-15 items-center justify-center"
      onSubmit={handleSubmit}
    >
      {formStep === 1 && (onEdit ? <EditAccountForm /> : <SignUpForm />)}
      {formStep == 2 && <ProfileForm />}
      {formStep == 3 && <ContactForm />}
      {formStep == 4 && <VehicleForm />}

      <div className="flex md:flex-row-reverse gap-10 flex-col">
        <button className="w-50" type="submit">
          {formStep == 4 ? "finalizar" : "próximo"}
        </button>

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
