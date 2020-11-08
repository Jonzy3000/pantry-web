import React, { useState } from "react";
import { useSearch } from "../api-queries/useSearch";
import { Input } from "./common/Input";
import { useRouter } from "next/router";

interface Props {
  initialValue?: string;
}

export const SearchBar = ({ initialValue }: Props) => {
  const router = useRouter();

  return (
    <div className="border-black border">
      <Input
        className="w-full"
        value={initialValue}
        onSubmit={(value) =>
          router.push({ pathname: "/search", query: { q: value } })
        }
      />
    </div>
  );
};
