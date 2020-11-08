import { Ingredient } from "./ingredient";

export interface Recipe {
  ingredients: Ingredient[];
  instructions: string[];
  title: string;
  description?: string;
}
