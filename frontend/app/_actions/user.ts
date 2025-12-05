"use server";

import { cookies } from "next/headers";
import { API_URL } from "../axios/config";
import { getErrorMessage } from "@/lib/getErrorMessage";

export async function updateUser(userId: number, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const token = (await cookies()).get("token")?.value;

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

  return { success: true };
}
