import { API_URL } from "@/app/config/env";
import { cookies } from "next/headers";

export async function verifySession() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return;
  }

  const res = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}
