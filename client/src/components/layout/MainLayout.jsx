import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
    const location = useLocation();

const hideNavbar =
  location.pathname === "/login";
  {!hideNavbar && <Navbar />}
  return (
    
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      <Navbar />

      <main className="pt-28 px-4 md:px-8">
        {children}
      </main>

    </div>
  );
};

export default MainLayout;