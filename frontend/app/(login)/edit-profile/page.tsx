import DriverForm from "@/app/components/DriverForm";

export default function EditProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Sua conta.</h1>
      <DriverForm onEdit={true} />
    </div>
  );
}
