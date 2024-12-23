import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import DonationLink from "@/components/DonationLogo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DerpNews",
    description:
        "Your trusted source for AI-generated satirical news articles that may or may not make sense.",
    openGraph: {
        title: "DerpNews",
        description: "AI-Generated Satirical News",
        siteName: "DerpNews",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} h-screen`}>
                <Navbar />
                {children}
                <DonationLink />
                <Footer />
            </body>
        </html>
    );
}
