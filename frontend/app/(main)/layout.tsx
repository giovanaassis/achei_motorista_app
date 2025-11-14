import Navbar from "../_components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <div className="mt-20 md:mt-30">{children}</div>
    </main>
  );
}
