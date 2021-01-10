import { Recipe } from "../../../types/recipe";
import { connectToDatabase } from "./mongodb";
import { Err, Ok, Result } from "ts-results";

export const saveRecipe = async ({
  id,
  ...recipe
}: Recipe): Promise<Result<void, Error>> => {
  const { db } = await connectToDatabase();

  try {
    await db
      .collection("recipes")
      .updateOne(
        { _id: id },
        { $set: { _id: id, ...recipe } },
        { upsert: true }
      );
    return Ok.EMPTY;
  } catch (e) {
    console.log(e);
    return new Err(new Error(e));
  }
};

export const findRecipeBySource = async (
  source: string
): Promise<Recipe | null> => {
  const { db } = await connectToDatabase();

  const recipe = await db.collection("recipes").findOne({ source });

  return recipe ? convertFromRecipeDocument(recipe) : null;
};

const convertFromRecipeDocument = (document: any): Recipe => {
  const { _id, title, ingredients, instructions, source } = JSON.parse(
    JSON.stringify(document)
  );

  return { id: _id, ingredients, instructions, source, title };
};
