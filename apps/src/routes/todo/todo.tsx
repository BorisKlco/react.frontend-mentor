import { CgRadioCheck } from "react-icons/cg";
import { LiaCheckCircle } from "react-icons/lia";
export default function Todo() {
  return (
    <div className="h-full bg-violet-950 flex justify-center pt-12">
      <div className="p-2 min-w-[20rem] md:min-w-[32rem] flex flex-col gap-4">
        <div className="">
          <h1 className="font-semibold text-3xl text-white tracking-[0.75rem]">
            TODO
          </h1>
        </div>
        <div className="flex items-center rounded bg-slate-900/60 text-white pl-2 py-2 gap-2 drop-shadow-lg">
          <CgRadioCheck className="opacity-40" size={20} />
          <input
            className="w-full bg-slate-900/0 text-gray-300 outline-none"
            type="text"
          />
        </div>
        <div className="rounded bg-slate-900/60 text-gray-300 drop-shadow-lg">
          {Array.from({ length: 4 }, (item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-2 border-b-[1px] border-gray-400/20 px-2 transition hover:backdrop-contrast-[1.05]"
            >
              {i % 2 ? (
                <CgRadioCheck className="opacity-40" size={20} />
              ) : (
                <LiaCheckCircle className="opacity-40" size={20} />
              )}
              <span>Task</span>
            </div>
          ))}

          <div className="flex justify-between p-2 text-[0.5rem] text-gray-300/50">
            <p>left text</p>
            <div>middle</div>
            <p>right text</p>
          </div>
        </div>
      </div>
    </div>
  );
}
