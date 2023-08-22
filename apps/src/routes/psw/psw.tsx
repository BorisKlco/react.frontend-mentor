import { MdContentCopy } from "react-icons/md";
import { useState } from "react";
export default function psw() {
  const [psw, setPsw] = useState("ZKdi!nJ7%U^PZM");

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
            className="text-violet-300 hover:contrast-125"
          >
            <MdContentCopy />
          </button>
        </div>
        <div className="text-white p-6 bg-gray-800/80">Hello</div>
      </div>
    </div>
  );
}
