import Link from "next/link"
import AuthPage from "../auth/page"
export default function Navbar() {
   return (
      <>
         <div className="max-w-7xl mx-auto flex items-center justify-between text-white p-3">
            <div className="flex space-x-10 items-center">
               <h2 className="uppercase text-xl font-bold">My Events</h2>
               <input
                  type="search"
                  placeholder="Search for an event, artist, organizer or city"
                  className="p-2 rounded-full bg-[#5c5c5c] outline-none w-[350px]"
               />
               <select className="outline-none">
                  <option>Explore</option>
                  <option>Events</option>
                  <option>Artists</option>
                  <option>Organizers</option>
                  <option>Cities</option>
               </select>
            </div>
            <div className="flex space-x-10 items-center">
               <span>I am an Organizer</span>
               <Link href="/auth">
                  <button className="uppercase bg-white text-black font-bold p-2 rounded-sm">
                     Login / Sign Up
                  </button>
               </Link>
            </div>

         </div>

      </>
   )
}