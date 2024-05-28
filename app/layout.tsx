import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/utils/theme-provider"
import { GeistSans } from 'geist/font/sans'
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import { Toaster } from "@/components/ui/sonner"
export const metadata: Metadata = {
  title: "SAM v.2.0",
  description: "Sistem Administrasi Moyamu",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning={true} className={GeistSans.className}>
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Toaster/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
