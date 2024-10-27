'use client'
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  const [themeColor, setThemeColor] = useState('text-black');
  const [themeIcon, setThemeIcon] = useState('text-black');

  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(systemTheme);
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
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleThemeSwitch = (type) => {
    if(type == 1) {
      setTheme("dark")
    } else if(type == 2) {
      setTheme("light")
    } else{
      setTheme("system")
    }
  };
  return true;
}
