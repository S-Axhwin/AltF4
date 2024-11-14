import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/header-auth";
import Nav from "@/components/Nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className} suppressHydrationWarning>
            <body className="bg-background text-foreground">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="min-h-screen bg-black p-4">
                        <div className="max-w-md mx-auto space-y-4">
                            <header className="flex justify-between items-center">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <Button variant="ghost" size="icon">
                                    <Search className="h-5 w-5" />
                                </Button>
                            </header>
                            {/* <Nav /> */}
                            {children}
                            <Toaster />
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
