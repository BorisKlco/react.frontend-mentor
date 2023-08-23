import { GiPlayButton, GiPauseButton } from "react-icons/gi";
import { Phonetic } from "./jsonType";
type PlayType = {
  track: Phonetic[];
};
export default function Play({ track }: PlayType) {
  console.log("playButton", track);
  const play = true;

  return (
    <button className="group rounded-full bg-violet-300 h-12 w-12 grid place-content-center">
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
  );
}
