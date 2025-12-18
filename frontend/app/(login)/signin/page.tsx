"use client";

import { signin } from "@/app/actions/auth";
import SignInForm from "@/app/(login)/_components/SignInForm";
import { useDriverContext } from "@/app/context/DriverContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState = { message: "", driver: undefined };

export default function SignInPage() {
  const [state, formAction, pending] = useActionState(signin, initialState);
  const { update } = useDriverContext();
  const router = useRouter();

  useEffect(() => {
    if (state.driver) {
      update(state.driver);
      router.push(`/profile/${state.driver.id}`);
    }
  }, [router, state.driver, update]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Login.</h1>
      <form className="loginForm" action={formAction}>
        <SignInForm pending={pending} state={state} />

        <p>
          Não tem uma conta?{" "}
          <Link href={"/signup"}>
            <span className="underline cursor-pointer">Cadastre-se</span>
          </Link>
        </p>
        {state?.message && <p>{state.message}</p>}
      </form>
    </div>
  );
}
