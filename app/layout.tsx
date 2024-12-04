import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LayoutProps } from "@/.next/types/app/layout";
import { Providers } from "./chakra/providers";

const font = Nunito_Sans({ subsets: ["latin"] });
export const metadata = {
  title: "Xenity - Chat App",
  description: "Created in order to get you friends. Made by WeCanHackNasa.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${font.className} flex flex-col lg:flex-row h-screen bg-neutral-900 text-white overflow-x-hidden`}
      >
        <Navbar />
          <div className="flex flex-col flex-grow lg:ml-32 mt-10 lg:mt-0 ">
            {children}
          </div>
      </body>
    </html>
  );
}
