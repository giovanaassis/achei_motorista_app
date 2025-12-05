/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { API_URL } from "../axios/config";
import { redirect } from "next/navigation";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { http } from "../api/http";
import { UserType } from "@/@types/user";

export async function signup(prevState: any, formData: FormData) {
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
  if (!res.ok) {
    const data = await res.json();
    return { message: getErrorMessage(data.error.status) };
  }

  const result = await res.json();

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

  if (!res2.ok) {
    const data = await res.json();
    return { message: getErrorMessage(data.error.status) };
  }

  // SAVE TOKEN ON COOKIES
  (await cookies()).set("token", result.jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/edit-profile");
}

export async function signin(prevState: any, formData: FormData) {
  const identifier = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  // CONFIRM USER PASSWORD
  if (confirmPassword !== password) {
    return { message: "As senhas tem que ser iguais." };
  }

  // SEND REQUEST TO LOGIN
  const res = await fetch(`${API_URL}/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    console.log("error", data);
    return { message: getErrorMessage(data.error.status) };
  }

  const data = await res.json();
  const user: UserType = data.user;

  // CHECK IF DRIVER EXISTS
  const res2 = await http(
    `drivers?populate=*&filters[user][id]=${user.id}`,
    "GET"
  );
  if (!res2.ok) {
    const data = await res2.json();
    return { message: getErrorMessage(data.error.status) };
  }

  // SAVE TOKEN ON COOKIES
  (await cookies()).set("token", data.jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  const data2 = await res2.json();
  if (data2.data.length === 0) {
    redirect("/edit-profile");
  }
  const driver = data2.data[0];

  return { driver };
}
