import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { identifier, password } = req.body;

  const strapiRes = await fetch(`http://localhost:1337/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await strapiRes.json();

  if (!strapiRes.ok) {
    return res.status(400).json({ error: data?.error || "Erro no login" });
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", data.jwt, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  return res.status(200).json({ user: data.user });
}
