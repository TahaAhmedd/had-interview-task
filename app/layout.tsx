import type {ReactNode} from "react";
import "./globals.css";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "File Explorer",
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang='en'>
      <body className='min-h-screen flex flex-col md:flex-row bg-gray-50'>
        <SideBar />
        <main className='flex-1 p-4 md:p-8 overflow-auto'>{children}</main>
      </body>
    </html>
  );
}
