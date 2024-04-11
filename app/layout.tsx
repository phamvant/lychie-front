import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { ContextProvider, Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import dotenv from "dotenv";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
dotenv.config();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable
        )}
      >
        <Providers>
          <ContextProvider>{children}</ContextProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
