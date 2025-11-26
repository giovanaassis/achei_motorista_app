import Header from "../_components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <div className="mt-20 md:mt-30">{children}</div>
    </main>
  );
}
