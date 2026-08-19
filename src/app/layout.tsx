import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
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
    "Full stack developer & DevOps engineer. Building products that scale clean, ship fast, and hold up.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900">
        <SmoothScroll>
          <Header />
          <main className="flex-1 pt-[60px]">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
