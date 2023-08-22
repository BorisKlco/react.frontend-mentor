import { useState } from "react";
import { CgRadioCheck } from "react-icons/cg";
import { LiaCheckCircle } from "react-icons/lia";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

type TodosType = {
  todo: string;
  done: boolean;
}[];
export default function Todo() {
  const [todo, addToDo] = useState("");
  const [tasks, setTasks] = useState<TodosType>([]);
  const [selectTasks, setSelectTasks] = useState<boolean | null>(null);

  const handleAddTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setTasks([{ todo: event.currentTarget.value, done: false }, ...tasks]);
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

  const handleReverseList = () => {
    const reverseList = [...tasks].reverse();
    setTasks(reverseList);
  };

  console.log(tasks);

  return (
    <div className="h-full bg-violet-950 flex justify-center pt-12">
      <div className="p-2 min-w-[20rem] sm:w-[32rem] flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="font-semibold text-4xl text-white tracking-[0.75rem]">
            TODO
          </h1>
          {tasks.length > 1 && (
            <div
              className="flex items-center text-white"
              onClick={handleReverseList}
            >
              <HiMiniArrowsUpDown size={36} className="cursor-pointer" />
            </div>
          )}
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
          {selectTasks === null
            ? tasks.map((item, i) => (
                <div
                  onClick={() => handleDoneTask(i)}
                  key={i}
                  className={`flex items-center gap-2 py-2 border-b-[1px] border-gray-400/20 px-2 transition hover:backdrop-contrast-[1.05] ${
                    item.done && "line-through opacity-50 blur-[0.5px]"
                  }`}
                >
                  {item.done ? (
                    <LiaCheckCircle size={20} />
                  ) : (
                    <CgRadioCheck className="opacity-40" size={20} />
                  )}
                  <span>{item.todo}</span>
                </div>
              ))
            : selectTasks
            ? tasks.map((item, i) => {
                if (!item.done) {
                  return (
                    <div
                      onClick={() => handleDoneTask(i)}
                      key={i}
                      className={`flex items-center gap-2 py-2 border-b-[1px] border-gray-400/20 px-2 transition hover:backdrop-contrast-[1.05] ${
                        item.done && "line-through opacity-50 blur-[0.5px]"
                      }`}
                    >
                      {item.done ? (
                        <LiaCheckCircle size={20} />
                      ) : (
                        <CgRadioCheck className="opacity-40" size={20} />
                      )}
                      <span>{item.todo}</span>
                    </div>
                  );
                }
              })
            : tasks.map((item, i) => {
                if (item.done) {
                  return (
                    <div
                      onClick={() => handleDoneTask(i)}
                      key={i}
                      className={`flex items-center gap-2 py-2 border-b-[1px] border-gray-400/20 px-2 transition hover:backdrop-contrast-[1.05] ${
                        item.done && "line-through opacity-50 blur-[0.5px]"
                      }`}
                    >
                      {item.done ? (
                        <LiaCheckCircle size={20} />
                      ) : (
                        <CgRadioCheck className="opacity-40" size={20} />
                      )}
                      <span>{item.todo}</span>
                    </div>
                  );
                }
              })}

          {tasks.length ? (
            <div className="flex justify-between p-2 text-sm text-gray-300/50">
              <p>{tasks.length} Items</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectTasks(null)}
                  className={`${selectTasks === null && "text-violet-300"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectTasks(true)}
                  className={`${selectTasks === true && "text-violet-300"}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setSelectTasks(false)}
                  className={`${selectTasks === false && "text-violet-300"}`}
                >
                  Done
                </button>
              </div>
              <button onClick={() => setTasks([])}>Clear</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
