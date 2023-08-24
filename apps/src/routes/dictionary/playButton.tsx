import { GiPlayButton, GiPauseButton } from "react-icons/gi";
import { Phonetic } from "./jsonType";
import { useState, useRef } from "react";
type PlayType = {
  track: Phonetic[];
};
export default function Play({ track }: PlayType) {
  const [isPlaying, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  let trackFile = "";

  for (const item of track) {
    if (item.audio.length) {
      trackFile = item.audio;
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlay(!isPlaying);
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={trackFile} onEnded={() => setPlay(false)} />
      <button
        onClick={togglePlayPause}
        className="group rounded-full bg-violet-300 h-12 w-12 grid place-content-center"
      >
        {!isPlaying ? (
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
}
