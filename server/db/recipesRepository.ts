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

  const recipes = await db
    .collection("recipes")
    .find()
    .limit(size)
    .skip(0)
    .sort({ _id: -1 })
    .toArray()
    .then((docs) => docs.map(convertFromRecipeDocument));

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

  const recipes = await db
    .collection("recipes")
    .find({ _id: { $in: ids } })
    .toArray()
    .then((docs) => docs.map(convertFromRecipeDocument));

  return recipes;
};

export const findRecipeById = async (id: string): Promise<Recipe | null> => {
  const { db } = await connectToDatabase();

  const doc = await db.collection("recipes").findOne({ _id: id });
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
