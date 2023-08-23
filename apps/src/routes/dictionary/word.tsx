import { DictType } from "./jsonType";
import Play from "./playButton";

type WordProps = {
  props: DictType;
};
export default function Word({ props }: WordProps) {
  return (
    <div
      key={props.word}
      className="mt-8 px-2 flex justify-between items-center font-serif"
    >
      <div>
        <h1 className="text-5xl font-bold capitalize">{props.word}</h1>
        <p className="text-xl text-violet-500 font-semibold mt-1">
          {props.phonetic}
        </p>
      </div>
      <Play track={props.phonetics} />
    </div>
  );
}
