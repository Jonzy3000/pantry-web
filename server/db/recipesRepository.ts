import { Recipe } from "../../types/recipe";
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

export const findRecipes = async (
  page: number = 0,
  size: number = 5
): Promise<Array<Recipe>> => {
  const { db } = await connectToDatabase();
  console.log("connected to db in findRecipes");

  const recipes = await db
    .collection("recipes")
    .find()
    .limit(size)
    .skip(0)
    .sort({ $natural: -1 })
    .toArray()
    .then((docs) => docs.map(convertFromRecipeDocument));

  console.log("found recipes in findRecipes");

  return recipes;
};

export const findRecipeBySource = async (
  source: string
): Promise<Recipe | null> => {
  const { db } = await connectToDatabase();

  const doc = await db.collection("recipes").findOne({ source });

  return doc && convertFromRecipeDocument(doc);
};

export const findRecipesByIds = async (
  ids: string[]
): Promise<Array<Recipe>> => {
  const { db } = await connectToDatabase();

  // Client side rendering seems slow and hacky (won't be able to page later)
  // We should denormalise the users recipes
  // Sorting here to return latest and greatest first
  const recipes = await db
    .collection("recipes")
    .find({ _id: { $in: ids } })
    .toArray()
    .then((docs) => docs.map(convertFromRecipeDocument))
    .then((recipes) =>
      recipes.sort(
        (a, b) =>
          ids.findIndex((id) => b.id === id) -
          ids.findIndex((id) => a.id === id)
      )
    );

  return recipes;
};

export const findRecipeById = async (id: string): Promise<Recipe | null> => {
  console.log("connectiong to db in find recipes...");
  const { db } = await connectToDatabase();
  console.log("connected to db");

  const doc = await db.collection("recipes").findOne({ _id: id });
  console.log("found recipe in mongo");
  return doc && convertFromRecipeDocument(doc);
};

export const streamAllRecipes = async (
  callbackData: (recipe: Recipe) => void,
  callbackEnd
) => {
  const { db } = await connectToDatabase();
  const cursor = db.collection("recipes").find({});

  cursor.on("data", (doc) => {
    const recipe = convertFromRecipeDocument(doc);
    callbackData(recipe);
  });

  cursor.on("end", () => {
    callbackEnd();
  });
};

const convertFromRecipeDocument = (document: any): Recipe => {
  const {
    _id,
    title,
    description,
    ingredients,
    instructions,
    source,
    times,
    images,
  } = JSON.parse(JSON.stringify(document));

  return {
    id: _id,
    ingredients,
    instructions,
    source,
    title,
    times,
    images,
    description,
  };
};
