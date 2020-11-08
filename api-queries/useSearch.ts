import { QueryResult, useQuery } from "react-query";
import { Recipe } from "../types/recipe";

export const useSearch = (search: string | null): QueryResult<Recipe> =>
  useQuery(
    ["recipe", { search }],
    () => {
      if (search) {
        return fetch(
          `https://syma8llxbd.execute-api.us-east-2.amazonaws.com/default/Pantry-scrape?url=${search}`
        ).then((res) => {
          return res.json().then((json) => {
            if (res.ok) {
              return json;
            }

            throw new Error(json);
          });
        });
      }
    },
    { retry: 1 }
  );
