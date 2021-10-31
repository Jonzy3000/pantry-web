import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
require("mongodb");

const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  database: process.env.MONGO_DB_URI,
};

export default (req, res) => NextAuth(req, res, options);
