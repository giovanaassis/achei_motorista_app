import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Login.</h1>
      <form className="flex flex-col gap-10 mt-15 items-center justify-center">
        <SignInForm />

        <button className="w-50 -mb-4">entrar</button>

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
