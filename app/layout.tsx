import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";

import { Inter } from "next/font/google";
import { Providers } from "./provider";
import Sidebar from "@/components/Sidebar";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ForkIt",
  description: "ForkIt is a platform for finding open source projects and sharing forks of existing repositories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Providers>
          <div className="flex"> 
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
        </ThemeProvider>
        </body>
    </html>
  );
}
