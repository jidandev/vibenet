const { setTheme } = require("@/app/redux/features/themeSlice");
const { usePathname, useRouter } = require("next/navigation");
const { useState, useEffect } = require("react");
const { PlanetOutline, HomeOutline, SearchOutline, MailOutline, PeopleOutline, PersonOutline, SettingsOutline } = require("react-ionicons");
const { useSelector, useDispatch } = require("react-redux");

const NavBar = () => {
    const {theme} = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    
    useEffect(() => {
      // Set theme dari localStorage saat komponen pertama kali dimuat
      const savedTheme = localStorage.getItem("theme") || "light";
      dispatch(setTheme(savedTheme));
    }, [dispatch]);
  
      const [themeColor, setThemeColor] = useState('text-black');
      const [themeIcon, setThemeIcon] = useState('text-black');
      useEffect(() => {
          if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          document.documentElement.classList.remove('dark', 'light');
          document.documentElement.classList.add(systemTheme);
          localStorage.setItem("theme", systemTheme)
          }
          else if(theme === "dark") {
          document.documentElement.classList.add("dark");
          setThemeColor("text-white");
          setThemeIcon("moon-outline");
          } else {
          document.documentElement.classList.remove("dark");
          setThemeColor("text-black");
          setThemeIcon("sunny-outline");
          }
          //localStorage.setItem("theme", theme)
          console.log(`theme: ${theme}`)
      }, [theme])
  
      const handleThemeSwitch = (type) => {
          if(type == 1) {
          dispatch(setTheme("dark"))
          localStorage.setItem("theme", "dark")
          } else if(type == 2) {
            dispatch(setTheme("light"))
            localStorage.setItem("theme", "light")
          } else{
            dispatch(setTheme("system"))
          }
          console.log(theme)
      };

      useEffect(() => {
        if(localStorage.getItem("theme") !== "dark" && localStorage.getItem("theme") !== "light") {
          localStorage.setItem("theme", "system")
        }
      }, [])
        const pathName = usePathname();
        const router = useRouter();
      
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
                <h1 onClick={() => handleThemeSwitch(theme == "light" ? 1 : 2)} className="w-8 h-8 "><PlanetOutline style={{color: theme == "dark" ? "white" : "black", width: "100%", height: "100%"}} /></h1>
                <ul className="text-black dark:text-white">
                    <li className="flex mb-3 mt-5 cursor-pointer" onClick={() => router.push("/")}>
                        <HomeOutline style={{color: theme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2 ">Home</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <SearchOutline style={{color: theme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2">Explore</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <MailOutline style={{color: theme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2">Message</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <PeopleOutline style={{color: theme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2">Communities</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <PersonOutline style={{color: theme == "dark" ? "white" : "black"}} />
                        <h1 className="text-xl ml-2">Profile</h1>
                    </li>
                    <li className="flex mb-3 mt-3 cursor-pointer" onClick={() => router.push("/")}>
                        <SettingsOutline style={{color: theme == "dark" ? "white" : "black"}} />
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