import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          // placeholder: "thuan",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credential, req) {
        if (!credential?.email || !credential.password) return null;
        const { email, password } = credential;
        const res = await fetch(process.env.BACKEND_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });

        if (res.status === 401) {
          return null;
        }

        const receivedUserObject = await res.json();

        return receivedUserObject;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() > token.backendTokens.expiresIn) {
        return await refreshToken(token);
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
};

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch(process.env.BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshTokenKey}`,
      "Content-type": "application/json",
    },
  });

  if (res.status === 201) {
    const { backendTokens } = await res.json();

    return {
      ...token,
      backendTokens: backendTokens,
    };
  }

  return { ...token };
};
