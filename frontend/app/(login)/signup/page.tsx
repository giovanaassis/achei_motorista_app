"use client";

import SignUpForm from "@/app/(login)/_components/SignUpForm";
import { signup } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

const initialState = { message: "" };

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* SIGNUP FORM */}
      <h1 className="text-4xl">Crie uma conta.</h1>
      <form className="loginForm" action={formAction}>
        <SignUpForm pending={pending} />

        <p>
          Já tem uma conta?{" "}
          <Link href={"/signin"}>
            <span className="underline cursor-pointer">Faça login</span>
          </Link>
        </p>
        {state?.message && <p>{state.message}</p>}
        {state.errors?.username && <p>{state.errors.username}</p>}
      </form>
    </div>
  );
}
