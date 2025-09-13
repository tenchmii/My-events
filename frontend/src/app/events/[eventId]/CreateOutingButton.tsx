"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
// On pourrait créer un composant Modal réutilisable plus tard

export default function CreateOutingButton({ eventId }: { eventId: string }) {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  const handleCreateOuting = async () => {
    // TODO: Implémenter la logique de fetch vers POST /api/outings
    console.log(`Créer une sortie pour l'événement ${eventId} avec la visibilité ${visibility}`);
    // Ici, on fera un fetch POST avec le token de session: session?.accessToken
    alert("Fonctionnalité de création en cours de développement !");
    setShowModal(false);
  };

  if (status !== "authenticated") {
    return null; // Ne rien afficher si l'utilisateur n'est pas connecté
  }

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-[#2D2D2D] hover:bg-[#403f3f] text-white font-bold py-2 px-4 rounded-lg mb-4"
      >
        Organiser une sortie
      </button>

      {/* Modale de création (simplifiée) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-white w-full max-w-md">
            <h3 className="text-2xl mb-4">Créer une nouvelle sortie</h3>
            <div className="space-y-4">
              <p>Choisissez la visibilité de votre sortie :</p>
              <div>
                <label className="mr-4">
                  <input type="radio" name="visibility" value="public" checked={visibility === 'public'} onChange={() => setVisibility('public')} /> Publique
                </label>
                <label>
                  <input type="radio" name="visibility" value="private" checked={visibility === 'private'} onChange={() => setVisibility('private')} /> Privée
                </label>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button onClick={() => setShowModal(false)} className="bg-gray-600 px-4 py-2 rounded">Annuler</button>
                <button onClick={handleCreateOuting} className="bg-black px-4 py-2 rounded">Confirmer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}