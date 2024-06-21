import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/sidebar/sidebar";
import Header from "./components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Veddiw",
  description: "Videocommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-full">  
          <SideBar/>
          <div className="flex flex-col w-full">
            <Header/>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
