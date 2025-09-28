import EditAccountForm from "@/app/components/EditAccountForm";

export default function EditAccountPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Sua conta.</h1>
      <EditAccountForm />
    </div>
  );
}
