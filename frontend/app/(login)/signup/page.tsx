import SignUpForm from "@/app/components/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* SIGNUP FORM */}
      <h1 className="text-4xl">Crie uma conta.</h1>
      <form className="loginForm">
        <SignUpForm />
        <button className="w-50 -mb-4">criar conta</button>

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
