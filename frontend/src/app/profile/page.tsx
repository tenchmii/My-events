"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, FormEvent } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"account" | "public">("account");

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleCancel = (e: FormEvent) => {
    setTempEmail(session?.user?.email || "");
    setIsEditing(false);
  };

  return (
    <div className="w-1/2 mx-auto bg-[#333232] mt-8 p-4 rounded-xl text-white">
      {status === "authenticated" && session?.user && (
        <>
          {/* Tab Buttons */}
          <div className="flex gap-2 m-10">
            <button
              className={`border w-full py-2 rounded-sm ${
                activeTab === "account" ? "bg-gray-700" : "border-gray-600"
              }`}
              onClick={() => setActiveTab("account")}
            >
              My account
            </button>
            <button
              className={`border w-full py-2 rounded-sm ${
                activeTab === "public" ? "bg-gray-700" : "border-gray-600"
              }`}
              onClick={() => setActiveTab("public")}
            >
              Public profile
            </button>
          </div>

          {/* Account Tab */}
          {activeTab === "account" && (
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

                <span className="text-3xl font-extrabold">{session.user.name}</span>
              </div>

              <div className="m-10">
                <h2 className="font-semibold text-xl">Mes Informations</h2>
                <div className="mt-2">
                  {!isEditing ? (
                    <div className="flex bg-[#575555] p-4 rounded-sm justify-between items-center">
                      <span>{session.user.email}</span>
                      <span
                        className="underline text-sm cursor-pointer"
                        onClick={() => {
                          setTempEmail(session?.user?.email || "");
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
                        onChange={(e) => setTempEmail(e.target.value)}
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
          {activeTab === "public" && (
            <div className="flex flex-col items-center m-10 gap-6">
              <div className="w-[100px] h-[100px] flex items-center justify-center rounded-full bg-gray-600 text-white text-3xl font-bold">
                +
              </div>
              <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                Edit Public Profile
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
