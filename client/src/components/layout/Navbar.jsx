import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
  className="
    fixed
    inset-x-0
    top-0
    z-50
    pt-5
    px-6
    sm:px-8
    lg:px-10
    xl:px-12
    2xl:px-16
  "
>
      <div className="max-w-[1700px] mx-auto">
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border border-white/10
            bg-black/50
            backdrop-blur-3xl
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          "
        >
          {/* Glow Effects */}
          <div className="absolute -top-10 left-10 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex items-center justify-between px-6 py-5 md:px-8">
            
            {/* Logo */}
            <Link
              to="/"
              className="
                group
                flex items-center gap-2
                text-3xl
                font-black
                tracking-tight
                transition duration-300
              "
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                Pinspired
              </span>

              <span
                className="
                  h-2 w-2 rounded-full
                  bg-white
                  shadow-[0_0_12px_rgba(255,255,255,0.8)]
                  group-hover:scale-125
                  transition duration-300
                "
              />
            </Link>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              
              {user ? (
                <>
                  {/* User Badge */}
                  <div
                    className="
                      hidden sm:flex
                      items-center gap-3
                      px-4 py-2
                      rounded-full
                      border border-white/10
                      bg-white/5
                    "
                  >
                    <div
                      className="
                        flex items-center justify-center
                        h-9 w-9
                        rounded-full
                        bg-gradient-to-br
                        from-gray-100
                        to-gray-400
                        text-black
                        font-bold
                        uppercase
                      "
                    >
                      {user.username?.charAt(0)}
                    </div>

                    <p className="text-sm text-gray-300 font-medium">
                      @{user.username}
                    </p>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="
                      relative
                      overflow-hidden
                      rounded-full
                      bg-gradient-to-br
                    from-orange-500
                    to-red-500
                    text-xl
                    text-white
                    shadow-[0_20px_50px_rgba(255,85,0,0.45)]
                      px-5 py-3
                      font-semibold
                      transition-all duration-300
                      hover:scale-105
                      hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]
                      active:scale-95
                    "
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="
                    relative
                    overflow-hidden
                    rounded-full
                    border border-white/10
                    bg-white
                    px-6 py-2.5
                    font-semibold
                    text-black
                    transition-all duration-300
                    hover:scale-105
                    hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]
                    active:scale-95
                  "
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;