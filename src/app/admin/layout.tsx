// "use client";

import { Inter as FontSans, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import AdminLayout from "./AdminLayout";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AdminLayout>{children}</AdminLayout>
        <Toaster />
      </body>
    </html>
  );
}
