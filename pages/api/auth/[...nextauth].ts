import NextAuth, { InitOptions, Session, User } from "next-auth";
import Providers from "next-auth/providers";
import { SessionBase } from "next-auth/_utils";
import { connectToDatabase } from "../../../server/db/mongodb";

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  database: process.env.MONGO_DB_URI,
};

export default (req, res) => NextAuth(req, res, options);
