import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "NEXTRIP - Your AI-Powered Moroccan Travel Guide",
  description:
    "Plan your personalized Moroccan adventure with NEXTRIP - Your AI-powered guide to the magic of Morocco.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
