import EditAccountForm from "@/app/components/EditAccountForm";

export default function EditAccountPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Sua conta.</h1>
      <form className="loginForm">
        <EditAccountForm />
        <button className="w-50 -mb-4">atualizar conta</button>
        <span className="-mt-5 cursor-pointer">Esqueceu a senha?</span>
      </form>
    </div>
  );
}
