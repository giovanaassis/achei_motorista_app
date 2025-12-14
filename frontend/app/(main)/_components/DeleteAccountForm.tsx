"use client";

import { deleteUser } from "@/app/_actions/user";
import { useDriverContext } from "@/app/context/DriverContext";
import { useTransition } from "react";

function DeleteAccountForm({
  userId,
  driverDocumentId,
}: {
  userId?: number;
  driverDocumentId?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { clear, driver } = useDriverContext();

  return (
    <form
      action={(formData) =>
        startTransition(async () => {
          const socials = driver?.driver_socials;
          const result = await deleteUser(formData, socials);
          if (result.success) {
            clear();
            window.location.href = "/search";
          }
        })
      }
    >
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="driverDocumentId" value={driverDocumentId} />

      <button className="bg-red-700 hover:bg-red-800 text-lg w-fit">
        {isPending ? "espere..." : "remover a conta"}
      </button>
    </form>
  );
}

export default DeleteAccountForm;
