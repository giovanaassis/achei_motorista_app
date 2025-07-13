"use client";

import ContactForm from "@/app/components/ContactForm";
import ProfileForm from "@/app/components/ProfileForm";
import SignUpForm from "@/app/components/SignUpForm";
import { useState } from "react";

export default function SignUpPage() {
  const [formStep, setFormStep] = useState<number>(1);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(formStep + 1);
  };

  const handlePrev = () => {
    setFormStep(formStep - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* SIGNUP FORM */}
      <h1 className="text-4xl">Crie uma conta.</h1>
      <form
        className="flex flex-col gap-10 mt-15 items-center justify-center"
        onSubmit={handleNext}
      >
        {formStep == 1 && <SignUpForm />}
        {formStep == 2 && <ProfileForm />}
        {formStep == 3 && <ContactForm />}

        <div className="flex flex-row-reverse gap-10">
          <button className="w-50">próximo</button>
          {formStep !== 1 && (
            <button className="w-50" type="button" onClick={handlePrev}>
              voltar
            </button>
          )}
        </div>

        {formStep === 1 && (
          <p>
            Já tem uma conta?{" "}
            <span className="underline cursor-pointer">Faça login</span>
          </p>
        )}
      </form>
    </div>
  );
}
