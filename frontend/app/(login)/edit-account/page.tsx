import { updateUser } from "@/app/actions/user";
import EditAccountForm from "@/app/(login)/_components/EditAccountForm";
import { verifySession } from "@/app/utils/session";

export default async function EditAccountPage() {
  const session = await verifySession();
  const user = session;

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const result = await updateUser(session.id, formData);
    return result;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">Sua conta.</h1>
      <EditAccountForm user={user} handleSubmitAction={handleSubmit} />
    </div>
  );
}
