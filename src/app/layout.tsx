import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aadarsh Deshmukh — Portfolio",
  description:
    "UI/UX designer, front-end enthusiast & full stack developer. Creating growth-driven products & brands.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900">
        <Header />
        <main className="flex-1 pt-[60px]">{children}</main>
      </body>
    </html>
  );
}
