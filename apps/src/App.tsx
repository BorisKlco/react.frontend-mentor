import { Outlet } from "react-router-dom";
import Navbar from "./routes/components/Navbar";
function App() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}

export default App;
