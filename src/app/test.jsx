'use client'
import Link from "next/link";
import InputForm from "@/components/elemets/Input";
import Checkbox from "@/components/elemets/Checkbox";
import { Button } from "@/components/elemets/Button";
import FormLogin from "@/components/fragments/FormLogin";
import { useEffect, useState } from "react";

export default function Home() {
  

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-white overflow-hidden dark:bg-black">
      <h1 className="text-red-600" onClick={() => handleThemeSwitch(1)}>Dark</h1>
      <h1 className="text-red-600" onClick={() => handleThemeSwitch(2)}>Light</h1>
      <h1 className="text-red-600" onClick={() => handleThemeSwitch(3)}>System</h1>
      <h1 className="text-black">Hello World</h1>
    </div>
  );
}
