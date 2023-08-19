import { Outlet, Link } from "react-router-dom";
function App() {
  return (
    <>
      <div className="bg-gray-400 pt-6">
        <nav>
          <ul>
            <li>
              <Link to={`todo`}>todo</Link>
            </li>
            <li>
              <Link to={`calc`}>calc</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full mt-4 bg-black">
        <p className="text-white text-4xl text-center">Text</p>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
