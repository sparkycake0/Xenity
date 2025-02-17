import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LayoutProps } from "@/.next/types/app/layout";
import UserCheck from "./lib/userchecking";

const font = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});
export const metadata = {
  title: "Xenity - Chat App",
  description: "Created in order to get you friends. Made by LunarWeb.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${font.variable} flex flex-col lg:flex-row h-screen bg-neutral-900 text-white overflow-x-hidden`}
      >
        <Navbar />

        <div className="flex flex-col flex-grow lg:ml-32 mt-10 lg:mt-0 ">
          <UserCheck>{children}</UserCheck>
        </div>
      </body>
    </html>
  );
}
