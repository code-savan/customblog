import AuthProvider from "@/components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog",
  description: "Next Authentication",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        suppressContentEditableWarning
        suppressHydrationWarning
        className={inter.className}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
