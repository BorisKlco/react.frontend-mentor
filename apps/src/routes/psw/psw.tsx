import { MdContentCopy } from "react-icons/md";
import { useState } from "react";
import Checkbox from "./checkbox";

export type SettingType = {
  [key: string]: boolean;
};

export default function PswGenerator() {
  const [psw, setPsw] = useState("");
  const [userLen, setLen] = useState(8);
  const [sett, setSett] = useState<SettingType>({
    up: true,
    low: true,
    num: true,
    sym: true,
  });

  //Password Strength counter
  const str = Object.keys(sett).filter((item) => sett[item] == true);
  const strDisplay = [];
  for (let i = 0; i < 4; i++) {
    if (str.length > i) {
      strDisplay.push(<p className="text-violet-400">|</p>);
    } else {
      strDisplay.push(<p className="text-gray-600">|</p>);
    }
  }

  const handleCopyPsw = () => {
    navigator.clipboard.writeText(psw);
  };

  const handleGenerate = () => {
    //User choice control
    if (!str.length) {
      return setPsw("Pick Setting");
    }
    //Generate password
    const dict: { [key: string]: string } = {
      up: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      low: "abcdefghijklmnopqrstuvwxyz",
      num: "0123456789",
      sym: "!@#$%^&*()_+-={}[]|;:,.<>?/~",
    };
    const settKeys = Object.keys(sett);
    let password = "";
    while (password.length < userLen) {
      const key = Math.floor(Math.random() * settKeys.length);
      if (sett[settKeys[key]]) {
        const randomKey = Math.floor(
          Math.random() * dict[settKeys[key]].length
        );
        password += dict[settKeys[key]][randomKey];
      }
    }
    setPsw(password);
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
            <span className="text-violet-400 text-2xl font-bold">
              {userLen}
            </span>
          </div>
          <div className="flex flex-col gap-4 items-start mt-4">
            <input
              className="w-full accent-violet-400 cursor-pointer"
              type="range"
              min="8"
              max="16"
              value={userLen}
              onChange={(e) => setLen(+e.target.value)}
            />
            <Checkbox
              text="Include Uppercase"
              checkType="up"
              checkState={sett}
              checkSetter={setSett}
            />
            <Checkbox
              text="Include Lowercase"
              checkType="low"
              checkState={sett}
              checkSetter={setSett}
            />
            <Checkbox
              text="Include Numbers"
              checkType="num"
              checkState={sett}
              checkSetter={setSett}
            />
            <Checkbox
              text="Include Symbols"
              checkType="sym"
              checkState={sett}
              checkSetter={setSett}
            />
          </div>
          <div className="flex justify-between w-full px-6 py-4 mt-6 bg-slate-900">
            <h1 className="text-gray-400">STRENGTH</h1>
            <span className="flex items-center font-bold">{strDisplay}</span>
          </div>
          <button
            onClick={handleGenerate}
            className="w-full text-slate-950 font-bold py-4 mt-4 text-center bg-violet-400 transition hover:bg-violet-500"
          >
            GENERATE
          </button>
        </div>
      </div>
    </div>
  );
}
