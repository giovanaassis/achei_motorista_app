"use client";

import { UserType } from "@/@types/user";
import SignUpForm from "@/app/components/SignUpForm";
import { registerUser } from "@/app/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const res = await registerUser(user);
    if (!res) {
      alert("Something went wrong. Please try again.");
    } else {
      router.push("edit-profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* SIGNUP FORM */}
      <h1 className="text-4xl">Crie uma conta.</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <SignUpForm user={user} onChangeUser={setUser} />

        <p>
          Já tem uma conta?{" "}
          <Link href={"/signin"}>
            <span className="underline cursor-pointer">Faça login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
