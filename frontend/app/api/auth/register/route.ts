/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/app/axios/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();
  console.log(username, email, password);

  try {
    const user = await axios.post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    });
    return NextResponse.json(user.data);
  } catch (error: any) {
    return NextResponse.json(`Error at register: ${error}`);
  }
}
