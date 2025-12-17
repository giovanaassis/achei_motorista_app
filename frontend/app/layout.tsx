import { Theme } from "@radix-ui/themes";
import { DriverProvider } from "@/app/context/DriverContext";
import "@/app/globals.css";
import { Afacad } from "next/font/google";
import { API_URL } from "./config/env";
import { verifySession } from "@/app/utils/session";
import { DriverType } from "@/app/types/driver";

const afacad = Afacad({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  let driver: DriverType | null = null;

  if (session) {
    const res = await fetch(
      `${API_URL}/drivers?populate=*&filters[user][id][$eq]=${session.id}`,
      { cache: "no-store" }
    );
    const { data } = await res.json();
    driver = data.length > 0 ? data[0] : null;
  }

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`antialiased ${afacad.className}`}
      >
        <Theme>
          <DriverProvider initialDriver={driver}>{children}</DriverProvider>
        </Theme>
      </body>
    </html>
  );
}
