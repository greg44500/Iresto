import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-background-image bg-cover bg-center h-screen w-full">
      <Navbar />
      <ToastContainer />
      <div className="max-w-[1440px] mx-auto flex items-center justify-center h-screen -m-10">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
