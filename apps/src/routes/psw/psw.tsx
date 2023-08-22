import { MdContentCopy } from "react-icons/md";
import { useState } from "react";
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
        <div className="text-white px-6 py-4 bg-gray-800/80">
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
            <span className="flex items-center gap-3 text-md">
              <div className="ring-2 ring-violet-400 h-5">
                <input
                  className="accent-black opacity-40 w-5 h-5"
                  type="checkbox"
                />
              </div>
              Include Uppercase
            </span>
            <span className="flex items-center gap-3 text-md">
              <div className="ring-2 ring-violet-400 h-5">
                <input
                  className="accent-black opacity-40 w-5 h-5"
                  type="checkbox"
                />
              </div>
              Include Lowercase
            </span>
            <span className="flex items-center gap-3 text-md">
              <div className="ring-2 ring-violet-400 h-5">
                <input
                  className="accent-black opacity-40 w-5 h-5"
                  type="checkbox"
                />
              </div>
              Include Numbers
            </span>
            <span className="flex items-center gap-3 text-md">
              <div className="ring-2 ring-violet-400 h-5">
                <input
                  className="accent-black opacity-40 w-5 h-5"
                  type="checkbox"
                />
              </div>
              Include Symbols
            </span>
          </div>
          <div>Text</div>
          <button>Generate</button>
        </div>
      </div>
    </div>
  );
}
