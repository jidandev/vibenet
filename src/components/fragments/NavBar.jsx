'use client'
import { current } from "@reduxjs/toolkit";
import { useTheme } from "next-themes";
const { usePathname, useRouter } = require("next/navigation");
const { useState, useEffect } = require("react");
const { PlanetOutline, HomeOutline, SearchOutline, MailOutline, PeopleOutline, PersonOutline, SettingsOutline } = require("react-ionicons");
const { useSelector, useDispatch } = require("react-redux");

const NavBar = () => {
  const dispatch = useDispatch();
    
 
        const pathName = usePathname();
        const router = useRouter();
      const { theme, setTheme, systemTheme } = useTheme();
      

      // Tentukan tema yang aktif saat ini
      const currentTheme = theme === 'system' ? systemTheme : theme;
      
      
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
        <nav className="my-10 text-black w-full px-8 dark:text-white ">
                <h1 onClick={() => currentTheme == "light" ? setTheme('dark') : setTheme('light')} className="w-8 h-8 "><PlanetOutline style={{color: currentTheme == "dark" ? "white" : "black", width: "100%", height: "100%"}} /></h1>
                <ul className="text-black dark:text-white">
                    <li className="flex mb-3 mt-5 cursor-pointer" onClick={() => router.push("/")}>
                        <HomeOutline style={{color: currentTheme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2 ">Home</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <SearchOutline style={{color: currentTheme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2">Explore</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <MailOutline style={{color: currentTheme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2">Message</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <PeopleOutline style={{color: currentTheme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2">Communities</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <PersonOutline style={{color: currentTheme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2">Profile</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <SettingsOutline style={{color: currentTheme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2">Settings</h1>
                    </li>
                </ul>
                <div className="overflow-hidden flex relative text-white bg-black dark:text-black dark:bg-white rounded-2xl w-full py-0 h-12 text-sm font-medium mt-3">
                  <h1 className=" m-auto">Post</h1>
                  <input onChange={handleFileChange} type="file" name="file" id="" className="absolute top-0 left-0 w-full h-full opacity-0 " />
                </div>
            </nav>
    )
}

export default NavBar;