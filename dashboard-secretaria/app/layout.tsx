import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SecretarIA - API",
  description: "API backend pour SecretarIA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
