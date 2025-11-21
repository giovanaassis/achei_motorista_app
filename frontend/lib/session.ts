import { API_URL } from "@/app/axios/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verifySession() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/search");
  }

  const res = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}
