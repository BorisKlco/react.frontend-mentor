import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./routes/components/Navbar";

function MainPage() {
  return (
    <div className="bg-violet-950 flex justify-center h-full overflow-auto py-8 px-2">
      <div className="">
        <h1 className="text-center font-semibold text-white text-4xl">
          Apps Idea
        </h1>
        <div className="text-white text-xl text-center leading-8">
          <p className="">
            <a
              className="font-semibold underline text-violet-300"
              href="https://www.frontendmentor.io/"
              target="_blank"
            >
              FrontendMentor
            </a>{" "}
            is a learning platform that provides examples, solutions, and
            templates.
          </p>
          <p>
            The main purpose is to teach students CSS/JS and correct front-end
            practices.
          </p>
          <p className="pt-6">
            I picked a few challenges that were fitted for a single-page app and
            reproduced them in React/Tailwind.
          </p>

          <div className="pt-12">
            <h1 className="text-left text-2xl font-semibold underline text-violet-300">
              <Link to={"todo"}>Todo List:</Link>
            </h1>
            <div className="pl-2 text-left">
              <p>- State for added task, task can be active or done.</p>
              <p>- Button for reversing task order</p>
              <p>- Panel with counter of tasks</p>
              <p>- Show Done,Active,All tasks</p>
            </div>
          </div>

          <div className="pt-8">
            <h1 className="text-left text-2xl font-semibold underline text-violet-300">
              <Link to={"dictionary"}>Dictionary:</Link>
            </h1>
            <div className="pl-2 text-left">
              <p>- @tanstack/react-query for data fetching.</p>
              <p>- Work with query states, fetched json.</p>
              <p>- Media handling, audio player.</p>
            </div>
          </div>

          <div className="py-8">
            <h1 className="text-left text-2xl font-semibold underline text-violet-300">
              <Link to={"psw"}>Psw Generator:</Link>
            </h1>
            <div className="pl-2 text-left">
              <p>- Counters and validators for generated passwords.</p>
              <p>- Handle multiple states as user choice.</p>
              <p>- Handle possible malicious options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function App() {
  const route = useLocation();

  return (
    <>
      <Navbar />
      {route.pathname == "/" ? <MainPage /> : <Outlet />}
    </>
  );
}

export default App;
