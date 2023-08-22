import { MdContentCopy } from "react-icons/md";
import { useState } from "react";
import Checkbox from "./checkbox";
export default function psw() {
  const [psw, setPsw] = useState("ZKdi!nJ7%U^PZM");
  const [len, setLen] = useState(8);

  const handleCopyPsw = () => {
    navigator.clipboard.writeText(psw);
  };

  return (
    <div className="h-full bg-slate-900 flex justify-center pt-12 font-ibm">
      <div className="flex flex-col gap-5 p-2 min-w-[20rem] sm:w-[32rem]">
        <h1 className="text-gray-500 text-center">Passwort Generator</h1>
        <div className="flex justify-between px-6 py-4 font-bold text-2xl text-gray-400 bg-gray-800/80">
          <span>{psw}</span>
          <button
            onClick={handleCopyPsw}
            className="text-violet-400 transition hover:text-violet-200"
          >
            <MdContentCopy />
          </button>
        </div>
        <div className="text-white px-6 py-4 bg-gray-800/80 select-none">
          <div className="flex items-center justify-between">
            <p className="text-xl">Character length</p>
            <span className="text-violet-400 text-2xl">{len}</span>
          </div>
          <div className="flex flex-col gap-4 items-start mt-4">
            <input
              className="w-full accent-violet-400 cursor-pointer"
              type="range"
              min="8"
              max="16"
              value={len}
              onChange={(e) => setLen(+e.target.value)}
            />
            <Checkbox text="Include Uppercase" />
            <Checkbox text="Include Lowercase" />
            <Checkbox text="Include Numbers" />
            <Checkbox text="Include Symbols" />
          </div>
          <div className="flex justify-between w-full px-6 py-4 mt-6 bg-slate-900">
            <h1 className="text-gray-400">STRENGTH</h1>
            <span>||||</span>
          </div>
          <button className="w-full text-slate-950 font-bold py-4 mt-4 text-center bg-violet-400 transition hover:bg-violet-500">
            GENERATE
          </button>
        </div>
      </div>
    </div>
  );
}
