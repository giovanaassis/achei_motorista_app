import GoBackButton from "./_components/GoBackButton";
import LoginBackground from "./_components/LoginBackground";

export default function LoginLayout({
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
