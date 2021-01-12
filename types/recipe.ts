export interface Recipe {
  ingredients: string[];
  instructions: string[];
  title: string;
  description?: string;
  id: string;
  source: string;
  times: {
    cook: string;
    total: string;
    prep: string;
  };
  images: string[];
}
