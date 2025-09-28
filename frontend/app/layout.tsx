import { DriverProvider } from "./context/DriverContext";
import "./globals.css";
import { Afacad } from "next/font/google";

const afacad = Afacad({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`antialiased ${afacad.className}`}
      >
        <DriverProvider>{children}</DriverProvider>
      </body>
    </html>
  );
}
