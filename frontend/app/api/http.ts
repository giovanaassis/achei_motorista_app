/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "../config/env";

export async function http(url: string, method: string, body?: any) {
  const res = await fetch(`${API_URL}/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  return res;
}
