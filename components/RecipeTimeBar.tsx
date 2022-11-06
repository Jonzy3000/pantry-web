import { ClockIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Recipe } from "../types/recipe";
import { Duration } from "luxon";

interface Props extends Pick<Recipe, "times"> {}

export const RecipeTimeBar = ({ times }: Props) => {
  return (
    <div className="flex items-center text-gray-500">
      <ClockIcon className="w-5" />
      {times.prep && <span className="pl-2">Prep: {format(times.prep)}</span>}
      {times.cook && (
        <span className="border-gray-300 border-l-2 ml-2 pl-2">
          Cook: {format(times.cook)}
        </span>
      )}
      {times.total && (
        <span className="border-gray-300 border-l-2 ml-2 pl-2">
          Total: {format(times.total)}
        </span>
      )}
    </div>
  );
};

const format = (time: string) => {
  const duration = Duration.fromISO(time);

  if (duration.hours > 0) {
    return `${duration.hours}h${duration.minutes}m`;
  }

  return `${duration.minutes}m`;
};
