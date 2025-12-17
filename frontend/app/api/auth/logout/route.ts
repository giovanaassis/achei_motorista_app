import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error at logout: ", error);
    return NextResponse.json(
      { success: false, message: "Erro ao deslogar" },
      { status: 500 }
    );
  }
}
