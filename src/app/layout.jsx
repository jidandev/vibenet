'use client'
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Playfair_Display } from 'next/font/google'
import ThemeSwitch from "./(Auth)/themeSwitch";
import { useEffect, useState } from "react";
import { HomeOutline, MailOutline, PeopleOutline, PersonOutline, PlanetOutline, SearchOutline, SettingsOutline } from "react-ionicons";
import { Button } from "@/components/elemets/Button";
import { usePathname, useRouter } from "next/navigation";
import { ReduxProvider } from "./providers";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./redux/features/themeSlice";
import NavBar from "@/components/fragments/NavBar";

// Menyembunyikan peringatan spesifik
const originalWarn = console.error;
console.error = (...args) => {
    if (/defaultProps will be removed/.test(args[0])) return;
    originalWarn(...args);
};

// Import dan konfigurasi font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const enablePathName = ["/", "/post", "/comment"]

// export const metadata = {
//   title: "VibeNet",
//   description: "Website Social Media",
// };

export default function RootLayout({ children }) {
  useEffect(() => {
    if(localStorage.getItem("theme") !== "dark" && localStorage.getItem("theme") !== "light") {
      localStorage.setItem("theme", "system")
    }
  }, [])
   
  const pathName = usePathname();
  const router = useRouter();
  return (
    <html lang="en" class="">
      <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>VibeNet</title>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <ReduxProvider >

        {enablePathName.includes(pathName) ? 
        <div className="flex min-h-screen bg-white dark:bg-black ">
        <div className="bg-white dark:bg-black h-screen w-[35rem] flex-col items-center hidden lg:flex">
            <NavBar />
        </div>
        {children}
        <div className="bg-white dark:bg-black h-screen w-[40rem] pl-5 pr-10 hidden lg:block">
          <input className="mt-10 bg-slate-300 dark:bg-gray-800 text-sm border-0 rounded-lg 2-full py-3 px-3 text-black dark:text-white w-full focus:ring-0 focus:outline-none" type="text" placeholder="Search" />
        </div>
    </div> : <>{children}</>
      }
        </ReduxProvider>
        
        
      </body>
    </html>
  );
}
