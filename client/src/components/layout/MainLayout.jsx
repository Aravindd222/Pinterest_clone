
import Navbar from "./Navbar";

import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login";

  return (

    <div className="min-h-screen bg-[#070707] text-white">

      {!hideNavbar && <Navbar />}

      <main className="pt-32 px-4 md:px-6">

        {children}

      </main>

    </div>
  );
};

export default MainLayout;
