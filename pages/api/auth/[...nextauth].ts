import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectToDatabase } from "../../../server/db/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
require("mongodb");

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
 adapter: MongoDBAdapter(connectToDatabase().then(connection => connection.client))
};

export default (req, res) => NextAuth(req, res, options);
