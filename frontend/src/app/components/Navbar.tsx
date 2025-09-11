"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between text-white p-3 border-b border-gray-700">
      <div className="flex space-x-10 items-center">
        <Link href="/" className="uppercase text-xl font-bold">
          My Events
        </Link>
        <input
          type="search"
          placeholder="Rechercher un événement..."
          className="p-2 rounded-full bg-[#5c5c5c] outline-none w-[350px] placeholder:text-gray-300"
        />
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
            <Link href="/profile">
              <span className="font-semibold">{session.user.name}</span>
            </Link>
              <div className="flex items-center space-x-4">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
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