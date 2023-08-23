import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWord } from "./getWord";

export default function Dictionary() {
  const [word, setWord] = useState("");

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
    <div className="h-full bg-gray-200 flex flex-col items-center pt-12">
      <div>Hello word</div>
      <div>
        <input
          className="w-full bg-slate-900/0 text-gray-600 outline-none border border-black"
          type="text"
          placeholder="Add new task"
          onKeyDown={handleFetch}
        />
      </div>
    </div>
  );
}
