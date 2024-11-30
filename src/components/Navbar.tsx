import { useState } from "react";
import { Film } from "lucide-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <GoogleOAuthProvider clientId="your-google-client-id">
      <nav className="bg-black text-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              <Link
                to="/"
                className="flex items-center space-x-2 logo-container group"
              >
                <Film className="h-8 w-8 text-orange-500 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-orange-400 drop-shadow-md" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300 ease-in-out drop-shadow-md">
                  Hovie
                </span>
              </Link>
            </div>

            <div className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
              <Link
                to="/movies"
                className="hover:text-orange-500 transition-colors"
              >
                Movies
              </Link>
              <Link
                to="/showtimes"
                className="hover:text-orange-500 transition-colors"
              >
                Showtimes
              </Link>
              <Link
                to="/profiles"
                className="hover:text-orange-500 transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/groups"
                className="hover:text-orange-500 transition-colors"
              >
                Groups
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                  >
                    <User size={20} />
                    {user.email}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-10">
                  <button
                    onClick={() => navigate("/login")}
                    className="hover:text-orange-400 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    style={{ padding: "0.2rem 0.5rem", borderRadius: "99px" }}
                    className="hover:bg-orange-400 hover:text-black transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white hover:text-orange-500 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
              >
                Sign up
              </Link>
            </div> */}
          </div>
        </div>
      </nav>
    </GoogleOAuthProvider>
  );
}
