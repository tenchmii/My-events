"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { signIn } from "next-auth/react"; 
import SocialLoginButton from "./SocialLoginButton";
import { useRouter } from "next/navigation"; 


type RegisterProps = {
  switchToLogin: () => void;
};

const Register = ({ switchToLogin }: RegisterProps) => {
   const [formData, setFormData] = useState({
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

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setLoading(true);

      if (formData.password !== formData.passwordConfirmation) {
         setError("Passwords do not match");
         setLoading(false);
         return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            pseudo: formData.nickname,
            password: formData.password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.detail || "Registration failed. Please try again.");
        }

        setSuccess("Registration successful! Switching to login...");
        setTimeout(() => {
          switchToLogin(); 
        }, 2000);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
   };

   return (
      <div className="flex flex-col bg-white w-full max-w-md rounded-lg p-7">
         <Link href="/">
            <span className="flex items-center cursor-pointer text-gray-600 hover:text-black"><IoMdArrowBack className="mr-1"/>Back to Home</span>
         </Link>
         <h2 className="heading text-4xl font-extrabold text-center mb-3 uppercase text-gray-800">Sign Up</h2>
         {error && <div className="text-red-500 text-center mb-2">{error}</div>}
         {success && <div className="text-green-500 text-center mb-2">{success}</div>}
         
         <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mt-4">
            <input type="text" name="nickname" placeholder="Nickname" onChange={handleChange} value={formData.nickname} className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full" required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full" required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full" required />
            <input type="password" name="passwordConfirmation" placeholder="Confirm Password" onChange={handleChange} value={formData.passwordConfirmation} className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full" required />
            
            <span className="text-sm">Already have an account? <a className="underline cursor-pointer text-blue-600" onClick={switchToLogin}>Log in</a></span>
            <button type="submit" className="w-full bg-black text-white font-semibold p-3 rounded-sm uppercase" disabled={loading}>
                {loading ? "Registering..." : "Sign Up"}
            </button>
            
            <div className="w-full text-center my-2 text-gray-500 text-sm">OR</div>
            <div className="w-full space-y-3">
              <SocialLoginButton provider="google" icon={FaGoogle} label="Continue with Google" />
              <SocialLoginButton provider="facebook" icon={FaFacebook} label="Continue with Facebook" iconColor="#1877F2" />
            </div>
         </form>
      </div>
   );
};


type LoginProps = {
   switchToRegister: () => void;
};

const Login = ({ switchToRegister }: LoginProps) => {
   const router = useRouter();
   const [formData, setFormData] = useState({ email: "", password: "" });
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const result = await signIn('credentials', {
          redirect: false, 
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {
          setError("Invalid email or password. Please try again.");
          setLoading(false);
        } else if (result?.ok) {
          router.push('/');
        }
      } catch (error) {
        console.error(error);
        setError("An unexpected error occurred.");
        setLoading(false);
      }
   };

   return (
      <div className="flex flex-col bg-white w-full max-w-md rounded-lg p-7">
         <Link href="/">
            <span className="flex items-center cursor-pointer text-gray-600 hover:text-black"><IoMdArrowBack className="mr-1"/>Back to Home</span>
         </Link>
         <h2 className="heading text-4xl font-extrabold text-center mb-3 uppercase text-gray-800">Log in</h2>
         {error && <div className="text-red-500 text-center mb-2">{error}</div>}

         <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mt-4">          
            <input type="email" name="email" placeholder="Please Enter your Email" onChange={handleChange} value={formData.email} className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full" required />
            <input type="password" name="password" placeholder="Please Enter your Password" onChange={handleChange} value={formData.password} className="border border-[#D9D9D9] outline-none p-3 rounded-sm w-full" required />
            
            <div className="flex w-full justify-end"><a href="#" className="underline text-sm text-blue-600">Forgot your password?</a></div>
            <button type="submit" className="w-full bg-black text-white font-semibold p-3 rounded-sm uppercase" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
            </button>
            <span className="text-sm">You don't have an account yet? <a className="underline cursor-pointer text-blue-600" onClick={switchToRegister}>Sign Up</a></span>
            
            <div className="w-full text-center my-2 text-gray-500 text-sm">OR</div>
            <div className="w-full space-y-3">
              <SocialLoginButton provider="google" icon={FaGoogle} label="Continue with Google" />
              <SocialLoginButton provider="facebook" icon={FaFacebook} label="Continue with Facebook" iconColor="#1877F2" />
            </div>
         </form>
      </div>
   );
};


export default function AuthPage() {
   const [showRegister, setShowRegister] = useState(true);

   return (
      <div className="min-h-screen flex items-center justify-center bg-[#1E1E1E] p-4">
         {showRegister ? (
            <Register switchToLogin={() => setShowRegister(false)} />
         ) : (
            <Login switchToRegister={() => setShowRegister(true)} />
         )}
      </div>
   );
}