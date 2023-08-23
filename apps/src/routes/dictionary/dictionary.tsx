import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWord } from "./getWord";
import {
  GiBookmark,
  GiMagnifyingGlass,
  GiPlayButton,
  GiPauseButton,
} from "react-icons/gi";
import { CgSpinnerAlt } from "react-icons/cg";
import { DictType } from "./jsonType";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [play, setPlay] = useState(false);
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

  if (fetchWord.isFetching) {
    return (
      <div className="h-full grid place-content-center animate-spin">
        <CgSpinnerAlt size={64} />
      </div>
    );
  }

  const res = fetchWord?.data ?? [];

  const handleFetch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setWord(event.currentTarget.value);
    }
  };

  const handlePlay = () => {
    setPlay(!play);
  };

  console.log(res);
  return (
    <div className="h-full bg-gray-200 flex flex-col items-center pt-12 px-2">
      <div className="p-4 w-full sm:w-[80%] lg:w-[60%]">
        <div id="header" className="flex items-end gap-2 mb-4 px-2">
          <GiBookmark size={48} />
          <h1 className="text-3xl font-bold font-handwriting"> Dictionary</h1>
        </div>
        {/* Search Input */}
        <div className="group flex relative font-serif font-semibold">
          <input
            className="w-full bg-slate-900/10 text-black outline-none py-3 pl-4 pr-12 rounded-md"
            type="text"
            placeholder={
              exampleList[Math.floor(Math.random() * exampleList.length)]
            }
            onKeyDown={handleFetch}
          />
          <button
            disabled
            className="absolute right-4 h-full text-gray-400 group-focus-within:text-violet-500"
          >
            <GiMagnifyingGlass size={24} />
          </button>
        </div>
        {/* Word, pronunciation */}
        {res.map((item: DictType) => {
          if (item.error) {
            return (
              <div key={item.error} className="flex justify-center mt-4">
                <h1 className="text-2xl">
                  No entry for
                  <span className="text-violet-600 font-bold"> {word}</span>
                </h1>
              </div>
            );
          }

          return (
            <div
              key={item.word}
              className="mt-8 px-2 flex justify-between items-center font-serif"
            >
              <div>
                <h1 className="text-6xl font-bold capitalize">{item.word}</h1>
                <p className="text-xl text-violet-500 font-semibold pl-2">
                  {item.phonetic}
                </p>
              </div>
              <button
                onClick={handlePlay}
                className="group rounded-full bg-violet-300 h-12 w-12 grid place-content-center"
              >
                {!play ? (
                  <GiPlayButton
                    className="group-hover:scale-125 transition text-violet-500"
                    size={18}
                  />
                ) : (
                  <GiPauseButton
                    className="group-hover:scale-125 transition text-violet-500"
                    size={18}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
