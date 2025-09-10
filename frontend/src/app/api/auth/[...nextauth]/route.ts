import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // On ne traite que les connexions via Google
      if (account?.provider !== "google") {
        return false; // Bloque les autres types de connexion pour le moment
      }

      console.log(`Callback signIn déclenché pour: ${user.email}`);

      try {
        const backendPayload = {
          email: user.email,
          pseudo: user.name,
          avatar_url: user.image,
          provider: account.provider,
          // --- CORRECTION CI-DESSOUS ---
          // La propriété correcte est 'providerAccountId' (avec un 'A' majuscule)
          provider_id: account.providerAccountId, 
        };

        console.log("Envoi du payload au backend:", backendPayload);

        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backendPayload),
        });

        if (!apiResponse.ok) {
          const errorBody = await apiResponse.text();
          console.error("Erreur de l'API backend:", errorBody);
          return false; // Empêche la connexion si notre API backend échoue
        }

        const data = await apiResponse.json();
        console.log("Réponse du backend reçue:", data);
        
        // On attache notre propre token JWT à l'objet 'account' pour le passer au callback 'jwt'
        (account as any).backend_token = data.access_token; 
        
        return true; // Connexion autorisée

      } catch (error) {
        console.error("Erreur de connexion à notre API backend:", error);
        return false;
      }
    },

    async jwt({ token, account }) {
      // Si le 'backend_token' est présent sur l'objet 'account' (seulement au moment du signIn),
      // on le transfère dans le token de session Next-Auth.
      if ((account as any)?.backend_token) {
        token.accessToken = (account as any).backend_token;
      }
      return token;
    },

    async session({ session, token }) {
      // On expose notre token JWT au client pour qu'il puisse faire des appels API
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };