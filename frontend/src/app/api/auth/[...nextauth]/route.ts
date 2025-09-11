import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              username: credentials.email,
              password: credentials.password,
            }),
          });
          
          if (!res.ok) {
            console.error("Failed to login:", await res.text());
            return null; 
          }

          const data = await res.json();

          if (data.user && data.access_token) {
            return {
              id: data.user.id.toString(),
              name: data.user.pseudo,
              email: data.user.email,
              image: data.user.avatar_url,
              backendToken: data.access_token, 
            };
          }
          
          return null;
        } catch (error) {
          console.error("Error in authorize callback:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              pseudo: user.name,
              avatar_url: user.image,
              provider: account.provider,
              provider_id: account.providerAccountId,
            }),
          });

          if (!apiResponse.ok) {
            console.error("Backend API error on google signin:", await apiResponse.text());
            return false;
          }

          const data = await apiResponse.json();
          (user as any).backendToken = data.access_token;
          return true;
        } catch (error) {
          console.error("Error connecting to backend API:", error);
          return false;
        }
      }
      return true; 
    },

    async jwt({ token, user }) {
      if ((user as any)?.backendToken) {
        token.accessToken = (user as any).backendToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth", 
    error: "/auth", 
  }
});

export { handler as GET, handler as POST };