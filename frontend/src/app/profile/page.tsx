"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
export default function Profile(){
   const { data: session, status } = useSession();
   return(
      <>
         <div className="w-1/2 mx-auto bg-[#333232] mt-8 p-1 rounded-xl">
            {status === "authenticated" && session?.user && (
               <>
                  <div className="flex items-center gap-10 m-10">
                     {session.user.image && (
                        <Image src={session.user.image} alt="Avatar" width={70} height={70} className="rounded-full"/>
                     )}
                     <span className="text-white text-3xl font-extrabold">{session.user.name}</span>
                  </div>
                  <div className="m-10 text-white">
                     <h2 className="font-semibold text-xl">Mes Informations</h2>
                     <div>
                        <span>Nickname: </span>
                     </div>

                  </div>
               </>
            )}
         </div>
      </>
   )
}