import GoBackButton from "../components/GoBackButton";
import LoginBackground from "../components/LoginBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full h-full">
      <section className="md:w-[80%] lg:w-[40%] w-full h-full p-5">
        <GoBackButton />
        {children}
      </section>
      <LoginBackground />
    </main>
  );
}
