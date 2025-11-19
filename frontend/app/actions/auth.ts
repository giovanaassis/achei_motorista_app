"use server";

import { cookies } from "next/headers";
import { API_URL } from "../axios/config";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const rawData = Object.fromEntries(formData);

  const data = {
    username: rawData.email,
    email: rawData.email,
    password: rawData.password,
  };

  const res = await fetch(`${API_URL}/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const result = await res.json();

  // SAVES TOKEN ON COOKIES
  (await cookies()).set("token", result.jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  // UPDATE USERNAME
  const res2 = await fetch(`${API_URL}/users/${result.user.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${result.jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: rawData.username }),
    cache: "no-store",
  });
  const user = await res2.json();

  if (!user) {
    throw new Error("houve um erro");
  }

  redirect("/search");
}
