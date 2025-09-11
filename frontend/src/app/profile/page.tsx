"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, FormEvent } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [tempEmail, SetTempEmail] = useState("");

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleCancel = (e: FormEvent) => {
    SetTempEmail(session?.user?.email || "");
    setIsEditing(false);
  };

  return (
    <div className="w-1/2 mx-auto bg-[#333232] mt-8 p-4 rounded-xl">
      {status === "authenticated" && session?.user && (
        <>
          <div className="flex items-center gap-5 m-10">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="Avatar"
                width={70}
                height={70}
                className="rounded-full"
              />
            ) : (
              <div className="w-[70px] h-[70px] flex items-center justify-center rounded-full bg-black text-white text-3xl font-bold">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <span className="text-white text-3xl font-extrabold">
              {session.user.name}
            </span>
          </div>
          <div>
            <span>{}</span>
          </div>

          <div className="m-10 text-white">
            <h2 className="font-semibold text-xl">Mes Informations</h2>

            <div className="mt-2">
              {!isEditing ? (
                <div className="flex bg-[#575555] p-4 rounded-sm justify-between items-center">
                  <span>{session.user.email}</span>
                  <span
                    className="underline text-sm cursor-pointer"
                    onClick={() => {
                      SetTempEmail(session?.user?.email || "");
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </span>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-2 bg-[#575555] p-4 rounded-sm"
                  onSubmit={handleSave}
                >
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => SetTempEmail(e.target.value)}
                    className="outline-none p-3 border rounded-sm"
                  />
                  <div className="flex gap-2 w-full sm:w-auto justify-between font-semibold">
                    <button
                      type="submit"
                      className="py-3 bg-black text-white rounded hover:bg-gray-900 transition w-full uppercase cursor-pointer "
                    >
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className=" py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition w-full uppercase cursor-pointer "
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
