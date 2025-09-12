"use client";

import React, { useState, createContext } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

export const SearchContext = createContext<{
  query: string;
  setQuery: (q: string) => void;
}>({
  query: "",
  setQuery: () => {},
});

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <div className="w-full max-w-7xl mx-auto text-white bg-[#1E1E1E] flex flex-col mt-3 px-4">
        <div className="w-full mx-auto flex items-center p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors gap-6">
          <Link href="/">
            <IoIosArrowBack className="hover:rounded-full hover:bg-gray-500 w-7 h-7 text-center p-1" />
          </Link>
          <input
            type="search"
            placeholder="Rechercher un événement, concert ou ville"
            className="outline-none w-full bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <main className="mt-5">{children}</main>
      </div>
    </SearchContext.Provider>
  );
}
