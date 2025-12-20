"use server";

import { cookies } from "next/headers";
import { API_URL } from "../config/env";
import { getErrorMessage } from "@/app/utils/getErrorMessage";
import { http } from "../api/http";
import { SocialType } from "@/app/types/social";
import { deleteSocials } from "./social";
import { validateForm } from "../utils/validateForm";
import { UserFormFields, UserFormSchema } from "@/lib/definitions";

export async function updateUser(
  userId: number,
  formData: FormData
): Promise<{
  success: boolean;
  message?: string;
  errors?: Partial<Record<keyof UserFormFields, string[]>>;
}> {
  const rawData = Object.fromEntries(formData);
  const token = (await cookies()).get("token")?.value;

  // VALIDATE FORM FIELDS
  const validation = validateForm(UserFormSchema, rawData);

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  // UPDATE PASSWORD
  if (rawData.new_password) {
    const res2 = await fetch(`${API_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: rawData.password,
        password: rawData.new_password,
        passwordConfirmation: rawData.new_password,
      }),
    });

    if (!res2.ok) {
      return { success: false, message: getErrorMessage(res2.status) };
    }
  }

  // UPDATE NAME AND EMAIL
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: rawData.name,
      email: rawData.email,
      username: rawData.email,
    }),
  });

  if (!res.ok) {
    return { success: false, message: getErrorMessage(res.status) };
  }

  return { success: true };
}

export async function deleteUser(formData: FormData, socials?: SocialType[]) {
  const userId = formData.get("userId") as string;
  const driverDocumentId = formData.get("driverDocumentId") as string;

  const res = await http(`users/${userId}`, "DELETE");
  const res2 = await http(`drivers/${driverDocumentId}`, "DELETE");
  if (!res.ok || !res2.ok) {
    return { success: false, executed: true };
  }

  // DELETE SOCIALS FROM USER
  if (socials && socials?.length > 0) {
    socials.forEach(async (s) => await deleteSocials(s.documentId));
  }

  const cookiesStore = await cookies();
  cookiesStore.delete("token");

  return { success: true, executed: true };
}
