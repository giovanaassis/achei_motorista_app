export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <h1>AcheiMotorista</h1>
        {children}
    </main>
  );
}
