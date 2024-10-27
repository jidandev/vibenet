import { PlanetOutline } from "react-ionicons";

const ThemeSwitch = () => {
   
    return (
        <h1 onClick={() => handleThemeSwitch(theme == "light" ? 1 : 2)} className="w-8 h-8 "><PlanetOutline style={{color: theme == "dark" ? "white" : "black", width: "100%", height: "100%"}} /></h1>
    )
}

export default ThemeSwitch;