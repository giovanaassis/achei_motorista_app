import { API_URL } from "../axios/config";

export async function http(url: string, method: string, body?: string) {
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
