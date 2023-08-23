import { NavLink } from "react-router-dom";
export default function Navbar() {
  const links = [
    { to: "todo", name: "Todo List" },
    { to: "dictionary", name: "Dictionary" },
    { to: "psw", name: "Psw Generator" },
  ];
  return (
    <div className="bg-indigo-950 py-2 border-b border-gray-400">
      <nav>
        <h1 className="flex justify-center text-6xl py-2 font-semibold text-white">
          react.Apps
        </h1>
        <ul className="mt-2 flex flex-col items-center sm:flex-row gap-4 justify-center text-neutral-300 text-2xl">
          {links.map((link, i) => (
            <li key={i}>
              <NavLink
                to={link.to}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? " text-violet-300" : ""
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
