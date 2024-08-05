import type { Metadata } from "next";
import { ThemeProvider } from "@/components/utils/theme-provider"
import { GeistSans } from 'geist/font/sans'
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

export const metadata: Metadata = {
  title: "SDHAMKA JEMBER",
  description: "Created by lundyscript.site",
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning={true} className={GeistSans.className}>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Toaster/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
