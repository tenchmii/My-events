"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FaFacebook } from 'react-icons/fa';
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

type RegisterProps = {
  switchToLogin: () => void;
};
const Register = ({ switchToLogin }: RegisterProps) => {
   const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      nickname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
   });
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [loading, setLoading] = useState(false);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setLoading(true);

      if (formData.password !== formData.passwordConfirmation) {
         setError("Passwords do not match");
         setLoading(false);
         return;
      }

      setSuccess("Registered successfully!");
      setLoading(false);
   };

   return (
      <div className="flex flex-col bg-white w-2/5 rounded-lg p-7">
         <Link href="/">
            <span className="flex items-center cursor-pointer"><IoMdArrowBack className="mr-1"/>Back</span>
         </Link>
         <h2 className="heading text-4xl font-extrabold text-center mb-3 uppercase">Sign Up</h2>
         {error && <div className="text-red-500">{error}</div>}
         {success && <div className="text-green-500">{success}</div>}
         <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <div className="flex w-full space-x-3">
               <input 
                  type="text" 
                  name="firstname" 
                  placeholder="First Name" 
                  onChange={handleChange} 
                  value={formData.firstname} 
                  className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full " />
               <input 
                  type="text" 
                  name="lastname" 
                  placeholder="Last Name" 
                  onChange={handleChange} 
                  value={formData.lastname}
                  className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full" />
            </div>
            <input
               type="text"
               name="nickname"
               placeholder="Nickname"
               onChange={handleChange}
               value={formData.nickname}
               className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full"
            />
            <input
               type="email"
               name="email"
               placeholder="Email"
               onChange={handleChange}
               value={formData.email}
               className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full"
            />
            <input
               type="password"
               name="password"
               placeholder="Password"
               onChange={handleChange}
               value={formData.password}
               className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full"
            />
            <input
               type="password"
               name="passwordConfirmation"
               placeholder="Confirm Password"
               onChange={handleChange}
               value={formData.passwordConfirmation}
               className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full"
            />
            <span>Already have an account? {""} 
               <a className="underline cursor-pointer" onClick={switchToLogin}>Log in</a>
            </span>
            <button type="submit" className="w-full bg-black text-white font-semibold p-3 rounded-sm uppercase">{loading ? "Loading..." : "Sign Up"}</button>
            <span>OR</span>
            <button  type="submit"  className="w-full bg-[#D9D9D9] font-semibold p-3 rounded-sm uppercase flex items-center justify-center space-x-2">
               {loading ? (
                  "Loading..."
               ) : (
                     <>
                        <FaFacebook color="#1877F2" size={20} />
                        <span>Continue with Facebook</span>
                     </>
               )}
            </button>
         </form>
      </div>
   );
};

type LoginProps = {
   switchToRegister: () => void;
};
const Login = ({ switchToRegister }: LoginProps) => {
   const [formData, setFormData] = useState({ email: "", password: "" });
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [loading, setLoading] = useState(false);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setLoading(true);

      setSuccess("Logged in successfully!");
      setLoading(false);
   };

   return (
      <div className="flex flex-col bg-white w-2/5 rounded-lg p-7">
         <Link href="/">
            <span className="flex items-center cursor-pointer"><IoMdArrowBack className="mr-1"/>Back</span>
         </Link>
         <h2 className="heading text-4xl font-extrabold text-center mb-3 uppercase">Log in</h2>
         {error && <div className="text-red-500">{error}</div>}
         {success && <div className="text-green-500">{success}</div>}
         <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">          
            <input
               type="email"
               name="email"
               placeholder="Please Enter your Email"
               onChange={handleChange}
               value={formData.email}
               className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full " 
            />
            <input
               type="password"
               name="password"
               placeholder="Please Enter your Password"
               onChange={handleChange}
               value={formData.password}
               className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full " 
            />
            <div className="flex w-full justify-end">
               <span className="underline text-right">Forgot your password?</span>
            </div>
            <button type="submit" className="w-full bg-black text-white font-semibold p-3 rounded-sm uppercase">{loading ? "Loading..." : "Log in"}</button>
            <span>
               You don't have an account yet?{" "}
               <a className="underline cursor-pointer" onClick={switchToRegister}>Sign Up</a>
            </span>
            <span>OR</span>
            <button  type="submit"  className="w-full bg-[#D9D9D9] font-semibold p-3 rounded-sm uppercase flex items-center justify-center space-x-2">
               {loading ? (
                  "Loading..."
               ) : (
                     <>
                        <FaFacebook color="#1877F2" size={20} />
                        <span>Continue with Facebook</span>
                     </>
               )}
            </button>
         </form>
      </div>
   );
};

export default function AuthPage() {
   const [showRegister, setShowRegister] = useState(true);
   return (
      <div className="h-screen flex items-center justify-center bg-[#1E1E1E]">
         {showRegister ? (
            <Register switchToLogin={() => setShowRegister(false)} />
         ) : (
            <Login switchToRegister={() => setShowRegister(true)} />
         )}
      </div>
   );
}

