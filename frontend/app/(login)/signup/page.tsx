import DriverForm from "@/app/components/DriverForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* SIGNUP FORM */}
      <h1 className="text-4xl">Crie uma conta.</h1>
      <DriverForm onEdit={false}/>
    </div>
  );
}
