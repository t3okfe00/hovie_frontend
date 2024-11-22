import React, { useState } from 'react';
import { Film } from 'lucide-react';
import AuthModal from './AuthModel';

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-black/95 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Hamburger Icon and Logo */}
            <div className="flex items-center space-x-8">
              {/* Hamburger icon visible on small screens */}
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

              {/* Logo */}
              <a href="/" className="flex items-center space-x-2 logo-container">
                <Film className="h-8 w-8 text-orange-500 transition-transform duration-500 ease-in-out scale-effect" />
                <span className="text-xl font-bold rainbow-hover">Hovie</span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <a href="/movies" className="hover:text-orange-500 transition-colors">Movies</a>
              <a href="/showtimes" className="hover:text-orange-500 transition-colors">Showtimes</a>
              <a href="/lists" className="hover:text-orange-500 transition-colors">Lists</a>
              <a href="/groups" className="hover:text-orange-500 transition-colors">Groups</a>
            </div>

            {/* Right Side: Login and Signup Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 text-sm font-medium text-white hover:text-orange-500 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="px-4 py-2 text-sm font-medium bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Hidden by default) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-black/90 absolute top-16 left-0 w-full p-4 z-40`}>
        <div className="flex flex-col items-start space-y-4 mt-4 px-4 ">
          <a href="/movies" className="text-white hover:text-orange-500">Movies</a>
          <a href="/showtimes" className="text-white hover:text-orange-500">Showtimes</a>
          <a href="/lists" className="text-white hover:text-orange-500">Lists</a>
          <a href="/groups" className="text-white hover:text-orange-500">Groups</a>
        </div>
      </div>

      {/* Login Modal */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        type="login"
      />

      {/* Sign Up Modal */}
      <AuthModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        type="signup"
      />
    </>
  );
}



