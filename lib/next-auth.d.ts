declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      username: string;
    };
    backendTokens: {
      accessToken: string;
      refreshTokenKey: string;
      expiresIn: number;
    };
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      username: string;
    };
    backendTokens: {
      accessToken: string;
      refreshTokenKey: string;
      expiresIn: number;
    };
  }
}
