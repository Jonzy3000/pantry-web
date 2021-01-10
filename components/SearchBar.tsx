import React from "react";
import { Input } from "./common/Input";
import { useRouter } from "next/router";

interface Props {
  initialValue?: string;
}

export const SearchBar = ({ initialValue }: Props) => {
  const router = useRouter();

  return (
    <div className="flex bg-transparent border-black border-b-2 p-1 focus-within:shadow-outline">
      <Input
        className="w-full bg-transparent focus:outline-none"
        initialValue={initialValue}
        onSubmit={(value) =>
          router.push({ pathname: "/search", query: { q: value } })
        }
      />
      <div className="px-4">
        <svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};
