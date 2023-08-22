import { useState } from "react";
import { CgRadioCheck } from "react-icons/cg";
import { LiaCheckCircle } from "react-icons/lia";

type TodosType = {
  todo: string;
  done: boolean;
}[];
export default function Todo() {
  const [todo, addToDo] = useState("");
  const [tasks, setTasks] = useState<TodosType>([]);

  const handleAddTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setTasks([...tasks, { todo: event.currentTarget.value, done: false }]);
      addToDo("");
    }
  };

  const handleDoneTask = (index: number) => {
    const updateTask = tasks.map((item, i) => {
      if (index === i) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTasks(updateTask);
  };

  return (
    <div className="h-full bg-violet-950 flex justify-center pt-12">
      <div className="p-2 min-w-[20rem] md:min-w-[32rem] flex flex-col gap-4">
        <div className="">
          <h1 className="font-semibold text-4xl text-white tracking-[0.75rem]">
            TODO
          </h1>
        </div>
        <div className="flex items-center rounded bg-slate-900/60 text-white pl-2 py-2 gap-2 drop-shadow-lg">
          <CgRadioCheck className="opacity-40" size={20} />
          <input
            className="w-full bg-slate-900/0 text-gray-300 outline-none"
            type="text"
            placeholder="Add new task"
            value={todo}
            onChange={(e) => addToDo(e.target.value)}
            onKeyDown={handleAddTask}
          />
        </div>
        <div className="rounded bg-slate-900/60 text-gray-300 drop-shadow-lg">
          {tasks.map((item, i) => (
            <div
              onClick={() => handleDoneTask(i)}
              key={i}
              className={`flex items-center gap-2 py-2 border-b-[1px] border-gray-400/20 px-2 transition hover:backdrop-contrast-[1.05] ${
                item.done && "line-through"
              }`}
            >
              {item.done ? (
                <LiaCheckCircle className="opacity-40" size={20} />
              ) : (
                <CgRadioCheck className="opacity-40" size={20} />
              )}
              <span>{item.todo}</span>
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
