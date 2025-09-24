"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateOutingButtonProps {
  eventId: string;
}

export default function CreateOutingButton({ eventId }: CreateOutingButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateOuting = async () => {
    setError(null);
    setLoading(true);

    if (!session?.accessToken) {
      setError("Authentification requise pour créer une sortie.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/outings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          event_external_id: eventId,
          visibility,
          note: title,
          meeting_date: date,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "La création de la sortie a échoué.");
      }

      setShowModal(false);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mb-4"
      >
        Organiser une sortie
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-2xl text-white w-full max-w-md border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Créer une nouvelle sortie</h3>

            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-2 rounded-md mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre / Note</label>
                <input
                  type="text"
                  placeholder="Ex: Apéro avant le concert 🍻"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date / Heure du rendez-vous</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Visibilité</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={visibility === "public"}
                      onChange={() => setVisibility("public")}
                    />
                    Publique
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={visibility === "private"}
                      onChange={() => setVisibility("private")}
                    />
                    Privée
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
                  disabled={loading}
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateOuting}
                  className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Création..." : "Confirmer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
