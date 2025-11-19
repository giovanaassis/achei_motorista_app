import SignUpForm from "@/app/_components/SignUpForm";
import { signup } from "@/app/actions/auth";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* SIGNUP FORM */}
      <h1 className="text-4xl">Crie uma conta.</h1>
      <form className="loginForm" action={signup}>
        <SignUpForm />

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
