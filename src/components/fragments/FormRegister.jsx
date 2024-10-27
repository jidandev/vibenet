'use client'
import { useSelector, useDispatch } from 'react-redux';
import {
  setStep,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setUsername,
  setError,
} from '../../app/redux/features/userSlice';

import { useState } from "react";
import { Button } from "../elemets/Button";
import Checkbox from "../elemets/Checkbox";
import InputForm from "../elemets/Input";
import { useRouter } from 'next/navigation';

const FormRegister = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { step, email, firstName, lastName, password, username, error } = useSelector((state) => state.user);

    const handleRegister = async (e) => {
      e.preventDefault();
      
      if(step == 0) {
        let emailValue = e.target.email.value || "";
      let fNameValue = e.target.fname.value || "";
      let lNameValue = e.target.lname.value || "";
        if(emailValue == "") return dispatch(setError("Email belum diisi"));
        if(fNameValue == "") return dispatch(setError("Firstname Belum diisi"));
        if(lNameValue == "") return dispatch(setError("Lastname belum disi"));
        dispatch(setError(""));
        dispatch(setEmail(emailValue));
        dispatch(setFirstName(fNameValue));
        dispatch(setLastName(lNameValue));
        dispatch(setStep(1));
      }
      else if(step == 1) {
        let passwordValue = e.target.password.value || "";
        let cPasswordValue = e.target.cpassword.value || "";
        if(passwordValue == "") return dispatch(setError("Password belum diisi"));
        if(cPasswordValue == "") return dispatch(setError("Confirm Password Belum diisi"));
        if(cPasswordValue !== passwordValue) return dispatch(setError("Confirm password tidak sama dengan password"))
        if(passwordValue == "") return false;
        if(cPasswordValue == "") return false;
        dispatch(setError(""))
        dispatch(setPassword(passwordValue));
        dispatch(setStep(2));
      }else {
        let usernameValue = e.target.username.value || "";
        if(usernameValue == "") return dispatch(setError("Username belum diisi"));
        dispatch(setError(""))
        dispatch(setUsername(usernameValue));
        router.push("/")
      }
      };  
    return (
        <form onSubmit={handleRegister} className="w-full">
          {step == 0 && (
            <>
              <InputForm type="email" name="email" placeholder="Enter your Email" label="Email"></InputForm>
              <InputForm type="text" name="fname" placeholder="Enter your Firstname" label="Firstname"></InputForm>
              <InputForm type="text" name="lname" placeholder="Enter your Lastname" label="Lastname"></InputForm>
              <Button type="submit" className="bg-black mt-8">Next</Button>
              
            </>
          )}
          {step == 1 && (
            <>
              <InputForm type="password" name="password" placeholder="Enter your Password" label="Password" ></InputForm>
              <InputForm type="password" name="cpassword" placeholder="Enter your Confirm Password" label="Confirm Password" ></InputForm>
              <Button type="submit" className="bg-black mt-8">Next</Button>
            </>
          )}
          {step == 2 && (
            <>
              <InputForm type="text" name="username" placeholder="Enter your Username" label="Username" ></InputForm>
              <Button type="submit" className="bg-black mt-8">Sign Up</Button>
            </>
          )}
          {error !== "" && <h1 className="text-red-500 text-xs mt-1 text-center">{error}</h1>}
        </form>
    )
}

export default FormRegister;