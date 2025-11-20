import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verfifySession() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/search");
  }

  return true;
}
