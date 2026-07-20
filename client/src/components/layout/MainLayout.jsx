import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      {!hideNavbar && <Navbar />}

      <main
        className="
          pt-32
          px-6
          sm:px-8
          lg:px-10
          xl:px-12
          2xl:px-16
          pb-16
        "
      >
        <div className="max-w-[1700px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;