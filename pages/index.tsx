import { SearchBar } from "../components/SearchBar";
import Cook from "./resources/cook.svg";
import Save from "./resources/save2.svg";
import Search from "./resources/search.svg";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-screen flex justify-center items-center h-96 bg-purple-100">
        <div className="max-w-2xl my-24">
          <div className="flex flex-col">
            <h1 className="text-2xl lg:text-4xl  mb-12 font-semibold">
              All your online recipes in one place
            </h1>
          </div>
          <SearchBar />
        </div>
      </div>
      <div className="sm:flex flex-col hidden lg:flex-row w-screen justify-around my-24 max-w-screen-md lg:max-w-screen-2xl">
        <DrawingCard
          svg={<Search viewBox="0 0 643 448" width="100%" height="150" />}
          text="Search"
        />
        <DrawingCard
          svg={<Save viewBox="0 0 832 677" width="100%" height="150" />}
          text="Save"
        />
        <DrawingCard
          svg={<Cook viewBox="0 0 890 692" width="100%" height="150" />}
          text="Cook"
        />
      </div>
    </div>
  );
}

interface DrawingCardProps {
  svg?: React.ReactNode;
  text: string;
}

const DrawingCard = ({ text, svg }: DrawingCardProps) => {
  return (
    <div className="flex flex-col flex-grow items-center mx-10 mb-10 lg:px-12 rounded-lg border border-purple-100">
      <div className="font-medium text-lg p-5">{text}</div>
      <div className="my-5 xl:m-5">{svg}</div>
    </div>
  );
};
