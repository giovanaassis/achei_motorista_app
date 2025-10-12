"use client";

import { UserType } from "@/@types/user";
import SignInForm from "@/app/components/SignInForm";
import { useDriverContext } from "@/app/context/DriverContext";
import { loginUser } from "@/app/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignInPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();
  const { update } = useDriverContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const res = await loginUser(user, confirmPassword, update);
    if (!res) {
      alert("Something went wrong. Please try again.");
    } else {
      router.push("edit-profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Login.</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <SignInForm
          user={user}
          onChangeUser={setUser}
          confirmPassword={confirmPassword}
          onConfirmPassword={setConfirmPassword}
        />

        <p>
          Não tem uma conta?{" "}
          <Link href={"/signup"}>
            <span className="underline cursor-pointer">Cadastre-se</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
