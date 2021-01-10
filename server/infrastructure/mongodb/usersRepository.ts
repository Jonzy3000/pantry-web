import { ObjectId } from "mongodb";
import { SessionBase } from "next-auth/_utils";
import { User } from "../../../types/user";
import { connectToDatabase } from "./mongodb";

export const saveRecipeForUser = async (userId, recipeId) => {
  const { db } = await connectToDatabase();
  await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { recipes: recipeId } }
    );
};

export const getUser = async (accessToken: string): Promise<User | null> => {
  const { db } = await connectToDatabase();
  const retreivedSession = await db
    .collection("sessions")
    .findOne({ accessToken });

  if (!retreivedSession) {
    return null;
  }

  const user = await db
    .collection("users")
    .findOne({ _id: retreivedSession.userId });

  if (!user) {
    return null;
  }

  const {
    _id,
    name,
    email,
    image,
    recipes,
  }: {
    _id: ObjectId;
    name: string;
    email: string;
    image: string;
    recipes: Array<string> | undefined;
  } = user;

  return {
    id: _id.toHexString(),
    name,
    email,
    image,
    recipes: recipes || [],
  };
};
