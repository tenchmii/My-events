"use client";

import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuItems = [
    { label: "City", href: "/explore/city" },
    { label: "Concert", href: "/explore/concert" },
    { label: "Exposition", href: "/explore/exposition" },
    { label: "Conference", href: "/explore/conference" },
  ];
  const { data: session, status } = useSession();

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between text-white p-3 border-b border-gray-700">
      <div className="flex space-x-10 items-center">
        <Link href="/" className="uppercase text-xl font-bold">
          My Events
        </Link>
        <Link href="/search">
          <button className="flex items-center p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors px-4" >
            <BiSearch className="mr-2" size={18} />
              Rechercher un événement, concert ou ville
          </button> 
        </Link>
        <div className="flex items-center gap-1">
          <button onClick={() => setOpen(!open)} className="relative">Explore</button>
          <IoIosArrowDown className="mt-1"/>
        </div>
        {open && (
          <div className="absolute mt-50 ml-140 w-40 bg-white rounded shadow-lg z-50">
            {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-2 text-black hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          </div>
        )}
      </div>

      <div className="flex space-x-6 items-center">
        <span className="cursor-pointer hover:text-blue-300 transition-colors">
          Je suis un organisateur
        </span>


        {status === "loading" && (
          <div className="w-24 h-9 bg-gray-600 animate-pulse rounded-sm" />
        )}

        {status === "unauthenticated" && (

          <Link href="/auth">
            <button className="uppercase bg-white text-black font-bold p-2 rounded-sm hover:bg-gray-200 transition-colors">
              Connexion
            </button>
          </Link>
        )}

        {status === "authenticated" && session?.user && (
          <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="Avatar"
                      width={70}
                      height={70}
                      className="rounded-full"/>
                  ) : (
                    <div className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-black text-white text-sm font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Link>
              <button
                onClick={() => signOut()}
                className="uppercase bg-red-600 text-white font-bold p-2 text-xs rounded-sm hover:bg-red-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}