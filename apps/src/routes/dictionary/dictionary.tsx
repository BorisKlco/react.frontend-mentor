import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWord } from "./getWord";
import { GiBookmark, GiMagnifyingGlass } from "react-icons/gi";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const exampleList = [
    "Aberration",
    "Conundrum",
    "Eloquent",
    "Serendipity",
    "Disparate",
    "Pragmatic",
    "Pernicious",
    "Ubiquitous",
    "Vicarious",
    "Ineffable",
  ];

  const fetchWord = useQuery({
    queryKey: ["word", word],
    queryFn: getWord,
    refetchOnWindowFocus: false,
    enabled: !!word,
  });

  const handleFetch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setWord(event.currentTarget.value);
    }
  };

  console.log(fetchWord);
  return (
    <div className="h-full bg-gray-300 flex flex-col items-center pt-12 px-2">
      <div className="p-4 w-full sm:w-[80%] lg:w-[60%]">
        <div id="header" className="flex items-end gap-2 mb-4">
          <GiBookmark size={48} />
          <h1 className="text-3xl font-bold font-handwriting"> Dictionary</h1>
        </div>
        <div className="group flex relative font-serif font-semibold">
          <input
            className="w-full bg-slate-900/10 text-black outline-none py-3 px-4 rounded-md"
            type="text"
            placeholder={
              exampleList[Math.floor(Math.random() * exampleList.length)]
            }
            onKeyDown={handleFetch}
          />
          <button className="absolute right-4 h-full text-gray-400 group-focus-within:text-gray-600">
            <GiMagnifyingGlass size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
