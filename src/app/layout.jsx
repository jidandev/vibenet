'use client'
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Playfair_Display } from 'next/font/google'
import { useEffect, useRef, useState } from "react";
import { Camera, Home, HomeOutline, Mail, MailOutline, PeopleOutline, Person, PersonOutline, PlanetOutline, Search, SearchOutline, SettingsOutline } from "react-ionicons";
import { Button } from "@/components/elemets/Button";
import { usePathname, useRouter } from "next/navigation";
import { ReduxProvider } from "./providers";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "@/components/fragments/NavBar";
import { ThemeProvider } from 'next-themes';

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
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap'
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

const enablePathName = ["/", "/post", "/comment", "/test"]

// export const metadata = {
//   title: "VibeNet",
//   description: "Website Social Media",
// };

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

 

      // Pastikan komponen hanya melakukan rendering di sisi client
      useEffect(() => setMounted(true), []);

      if (!mounted) return null; // hindari flickering saat rendering awal

      //image
      const handleFileChange = (event) => {
        const file = event.target.files[0]; // Mengambil file pertama yang dipilih
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          localStorage.setItem("image", imageUrl);
        }
        router.push("/post")
      };
  return (
    <html lang="en" class="dark" >
      <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>VibeNet</title>
      </head>
      <body
        className={` antialiased bg-white dark:bg-black `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          <ReduxProvider >

          {enablePathName.includes(pathName) ? 
          <div  className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-black container mx-auto sm:px-20 xl:px-28 relative">
          
            <div className="sticky inset-0  bg-white dark:bg-black h-screen w-[35rem] flex-col items-center hidden lg:flex">
                <NavBar />
            </div>
            {children}
  
            <div className="fixed z-10 left-0 bottom-0 bg-black/30 backdrop-blur-md h-14 w-full sm:w-[30rem] md:w-[38rem] sm:left-auto flex justify-between items-center lg:hidden">
              <h1 onClick={() => router.push("/")} className="w-8 h-8 ml-4"><Home style={{fill: "white", width: "100%", height: "100%"}} /></h1>
              <h1 className="w-8 h-8 ml-4 "><Mail style={{fill: "white", width: "100%", height: "100%"}} /></h1>
              <h1 className="w-8 h-8 ml-4 relative"><Camera style={{fill: "white", width: "100%", height: "100%"}} /><input onChange={handleFileChange} type="file" name="file" id="" className="absolute top-0 left-0 w-full h-full opacity-0 " /></h1>
              <h1 className="w-8 h-8 ml-4"><Search style={{fill: "white", width: "100%", height: "100%"}} /></h1>
              <h1 className="w-8 h-8 ml-4"><Person style={{fill: "white", width: "100%", height: "100%"}} /></h1>
                  
            </div>
            <div className="sticky inset-0 right-0 bg-white dark:bg-black h-screen w-[45rem] pl-5 hidden lg:block">
              <input className="mt-10 bg-slate-300 dark:bg-gray-800 text-sm border-0 rounded-lg 2-full py-3 px-3 text-black dark:text-white w-full focus:ring-0 focus:outline-none" type="text" placeholder="Search" />
            </div>
          </div> 
      : <>{children}</>
        }
          </ReduxProvider>
      </ThemeProvider>
        
      </body>
    </html>
  );
}
