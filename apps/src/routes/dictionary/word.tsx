import { DictType } from "./jsonType";
import Play from "./playButton";

type WordProps = {
  props: DictType;
};
export default function Word({ props }: WordProps) {
  return (
    <>
      <div
        key={props.word}
        className="mt-8 px-2 flex justify-between items-center font-serif"
      >
        <div>
          <h1 className="text-5xl font-bold capitalize">{props.word}</h1>
          <p className="text-xl text-violet-500 font-semibold mt-1 font-sans">
            {props.phonetic}
          </p>
        </div>
        <Play track={props.phonetics} />
      </div>

      {/* Noun Section */}
      <div className="flex justify-between gap-2 items-center px-2 my-3">
        <p className="font-semibold font-handwriting pt-2">noun</p>
        <hr className="w-[90%] h-px bg-gray-400 border-0 " />
      </div>

      <div className="px-2 font-serif mt-6">
        <h2 className="opacity-60 pb-4">Meaning</h2>
        <ul className="list-disc list-inside pl-4">
          {props.meanings.map((type, i) => {
            if (type.partOfSpeech === "noun") {
              return type.definitions.map((item) => (
                <li key={i} className="my-2">
                  {item.definition}
                </li>
              ));
            }
          })}
        </ul>
      </div>

      <div className="flex px-2 font-serif mt-6">
        <h2 className="opacity-60 pb-4">Synonyms</h2>
        <div className="pl-6 flex flex-wrap ">
          {props.meanings.map((type, i) => {
            if (type.partOfSpeech === "noun") {
              return type.synonyms.map((item) => (
                <h3
                  key={i}
                  className="text-violet-600 font-bold px-1 break-normal"
                >
                  {item}
                </h3>
              ));
            }
          })}
        </div>
      </div>

      {/* Verb Section */}
      <div className="flex justify-between gap-2 items-center px-2 my-3">
        <p className="font-semibold font-handwriting pt-2">verb</p>
        <hr className="w-[90%] h-px bg-gray-400 border-0 " />
      </div>

      <div className="px-2 font-serif mt-6">
        <h2 className="opacity-60 pb-4">Meaning</h2>
        <ul className="list-disc list-inside pl-4">
          {props.meanings.map((type, i) => {
            if (type.partOfSpeech === "verb") {
              return type.definitions.map((item) => (
                <div key={i}>
                  <li className="my-2">{item.definition}</li>
                  <p className="opacity-75 italic pl-5">"{item.example}"</p>
                </div>
              ));
            }
          })}
        </ul>
      </div>
      <hr className="w-full mt-8 mb-4 h-px bg-gray-400 border-0 " />
    </>
  );
}
