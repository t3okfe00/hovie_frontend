// import React, { useState } from "react";
// import { Film } from "lucide-react";
// import AuthModal from "./AuthModel";

// export default function Navbar() {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       <nav className="bg-black/95 text-white shadow-lg fixed w-full top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Left Side: Hamburger Icon and Logo */}
//             <div className="flex items-center space-x-8">
//               {/* Hamburger icon visible on small screens */}
//               <div className="md:hidden flex items-center">
//                 <button onClick={toggleMenu} className="text-white">
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Logo */}
//               <a
//                 href="/"
//                 className="flex items-center space-x-2 logo-container group"
//               >
//                 <Film className="h-8 w-8 text-orange-500 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-orange-400 drop-shadow-md" />
//                 <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300 ease-in-out drop-shadow-md">
//                   Hovie
//                 </span>
//               </a>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex space-x-6">
//               <a
//                 href="/movies"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Movies
//               </a>
//               <a
//                 href="/showtimes"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Showtimes
//               </a>
//               <a
//                 href="/lists"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Lists
//               </a>
//               <a
//                 href="/groups"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Groups
//               </a>
//             </div>

//             {/* Right Side: Login and Signup Buttons */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowLoginModal(true)}
//                 className="px-4 py-2 text-sm font-medium text-white hover:text-orange-500 transition-colors"
//               >
                

//                 Log in
//               </button>
//               <button
//                 onClick={() => setShowSignupModal(true)}
//                 className="px-4 py-2 text-sm font-medium bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
//               >
//                 Sign up
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu (Hidden by default) */}
//       <div
//         className={`md:hidden ${
//           isMenuOpen ? "block" : "hidden"
//         } bg-black/90 absolute top-16 left-0 w-full p-4 z-40`}
//       >
//         <div className="flex flex-col items-start space-y-4 mt-4 px-4 ">
//           <a href="/movies" className="text-white hover:text-orange-500">
//             Movies
//           </a>
//           <a href="/showtimes" className="text-white hover:text-orange-500">
//             Showtimes
//           </a>
//           <a href="/lists" className="text-white hover:text-orange-500">
//             Lists
//           </a>
//           <a href="/groups" className="text-white hover:text-orange-500">
//             Groups
//           </a>
//         </div>
//       </div>

//       {/* Login Modal */}
//       <AuthModal
//         isOpen={showLoginModal}
//         onClose={() => setShowLoginModal(false)}
//         type="login"
//       />

//       {/* Sign Up Modal */}
//       <AuthModal
//         isOpen={showSignupModal}
//         onClose={() => setShowSignupModal(false)}
//         type="signup"
//       />
//     </>
//   );
// }




// import React, { useState } from "react";
// import { Film } from "lucide-react";
// import AuthModal from "./AuthModel";
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import Google OAuth components

// export default function Navbar() {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLoginSuccess = (response) => {
//     console.log("Login Success:", response);
//     // Handle the login success here (e.g., save the token, authenticate the user, etc.)
//   };

//   const handleLoginFailure = (error) => {
//     console.error("Login Failed:", error);
//     // Handle the login failure here
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email:", email, "Password:", password);
//     // You can add your regular login logic here (e.g., authenticate with an API)
//   };

//   return (
//     <GoogleOAuthProvider clientId="540382082866-rpki92m7ce9nvnaf67dig2mnja0rvufq.apps.googleusercontent.com">
//       <nav className="bg-black/95 text-white shadow-lg fixed w-full top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Left Side: Hamburger Icon and Logo */}
//             <div className="flex items-center space-x-8">
//               {/* Hamburger icon visible on small screens */}
//               <div className="md:hidden flex items-center">
//                 <button onClick={toggleMenu} className="text-white">
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Logo */}
//               <a
//                 href="/"
//                 className="flex items-center space-x-2 logo-container group"
//               >
//                 <Film className="h-8 w-8 text-orange-500 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-orange-400 drop-shadow-md" />
//                 <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300 ease-in-out drop-shadow-md">
//                   Hovie
//                 </span>
//               </a>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex space-x-6">
//               <a
//                 href="/movies"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Movies
//               </a>
//               <a
//                 href="/showtimes"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Showtimes
//               </a>
//               <a
//                 href="/lists"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Lists
//               </a>
//               <a
//                 href="/groups"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Groups
//               </a>
//             </div>

//             {/* Right Side: Login and Signup Buttons */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowLoginModal(true)}
//                 className="px-4 py-2 text-sm font-medium text-white hover:text-orange-500 transition-colors"
//               >
//                 Log in
//               </button>
//               <button
//                 onClick={() => setShowSignupModal(true)}
//                 className="px-4 py-2 text-sm font-medium bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
//               >
//                 Sign up
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Login Modal with Form (Email, Password, and Google Login) */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-md w-96 shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">Login</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="password" className="block text-sm font-medium">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//               >
//                 Login
//               </button>
//             </form>

//             {/* Google Login Button Below the Login Button */}
//             <div className="mt-4">
//               <GoogleLogin
//                 onSuccess={handleLoginSuccess}
//                 onError={handleLoginFailure}
//                 useOneTap
//                 shape="circle" // Customize the appearance if desired
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu (Hidden by default) */}
//       <div
//         className={`md:hidden ${
//           isMenuOpen ? "block" : "hidden"
//         } bg-black/90 absolute top-16 left-0 w-full p-4 z-40`}
//       >
//         <div className="flex flex-col items-start space-y-4 mt-4 px-4 ">
//           <a href="/movies" className="text-white hover:text-orange-500">
//             Movies
//           </a>
//           <a href="/showtimes" className="text-white hover:text-orange-500">
//             Showtimes
//           </a>
//           <a href="/lists" className="text-white hover:text-orange-500">
//             Lists
//           </a>
//           <a href="/groups" className="text-white hover:text-orange-500">
//             Groups
//           </a>
//         </div>
//       </div>

//       {/* Sign Up Modal */}
//       <AuthModal
//         isOpen={showSignupModal}
//         onClose={() => setShowSignupModal(false)}
//         type="signup"
//       />
//     </GoogleOAuthProvider>
//   );
// }


// import React, { useState } from "react";
// import { Film } from "lucide-react";
// import AuthModal from "./AuthModel";
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import Google OAuth components

// export default function Navbar() {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLoginSuccess = (response) => {
//     console.log("Login Success:", response);
//     // Handle the login success here (e.g., save the token, authenticate the user, etc.)
//   };

//   const handleLoginFailure = (error) => {
//     console.error("Login Failed:", error);
//     // Handle the login failure here
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email:", email, "Password:", password);
//     // You can add your regular login logic here (e.g., authenticate with an API)
//   };

//   return (
//     <GoogleOAuthProvider clientId="540382082866-rpki92m7ce9nvnaf67dig2mnja0rvufq.apps.googleusercontent.com">
//       <nav className="bg-black/95 text-white shadow-lg fixed w-full top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Left Side: Hamburger Icon and Logo */}
//             <div className="flex items-center space-x-8">
//               {/* Hamburger icon visible on small screens */}
//               <div className="md:hidden flex items-center">
//                 <button onClick={toggleMenu} className="text-white">
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Logo */}
//               <a
//                 href="/"
//                 className="flex items-center space-x-2 logo-container group"
//               >
//                 <Film className="h-8 w-8 text-orange-500 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-orange-400 drop-shadow-md" />
//                 <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300 ease-in-out drop-shadow-md">
//                   Hovie
//                 </span>
//               </a>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex space-x-6">
//               <a
//                 href="/movies"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Movies
//               </a>
//               <a
//                 href="/showtimes"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Showtimes
//               </a>
//               <a
//                 href="/lists"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Lists
//               </a>
//               <a
//                 href="/groups"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Groups
//               </a>
//             </div>

//             {/* Right Side: Login and Signup Buttons */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowLoginModal(true)}
//                 className="px-4 py-2 text-sm font-medium text-white hover:text-orange-500 transition-colors"
//               >
//                 Log in
//               </button>
//               <button
//                 onClick={() => setShowSignupModal(true)}
//                 className="px-4 py-2 text-sm font-medium bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
//               >
//                 Sign up
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Login Modal with Form (Email, Password, and Google Login) */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-md w-96 shadow-lg">
//             <h2 className="text-2xl text-gray-700 flex justify-center items-center font-bold mb-4">Login</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="password" className="block text-sm font-medium">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-blue-600"
//               >
//                 Login
//               </button>
//             </form>

//             {/* Google Login Button Below the Login Button */}
//             <div className="mt-4">
//               <GoogleLogin
//                 onSuccess={handleLoginSuccess}
//                 onError={handleLoginFailure}
//                 useOneTap
//                 shape="pill" // Customize the appearance if desired
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu (Hidden by default) */}
//       <div
//         className={`md:hidden ${
//           isMenuOpen ? "block" : "hidden"
//         } bg-black/90 absolute top-16 left-0 w-full p-4 z-40`}
//       >
//         <div className="flex flex-col items-start space-y-4 mt-4 px-4 ">
//           <a href="/movies" className="text-white hover:text-orange-500">
//             Movies
//           </a>
//           <a href="/showtimes" className="text-white hover:text-orange-500">
//             Showtimes
//           </a>
//           <a href="/lists" className="text-white hover:text-orange-500">
//             Lists
//           </a>
//           <a href="/groups" className="text-white hover:text-orange-500">
//             Groups
//           </a>
//         </div>
//       </div>

//       {/* Sign Up Modal */}
//       <AuthModal
//         isOpen={showSignupModal}
//         onClose={() => setShowSignupModal(false)}
//         type="signup"
//       />
//     </GoogleOAuthProvider>
//   );
// }






// import React, { useState } from "react";
// import { Film } from "lucide-react";
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import Google OAuth components
// import { MailIcon, LockClosedIcon } from '@heroicons/react/24/outline'; // Correct import for Heroicons v2
// import { XMarkIcon } from '@heroicons/react/24/outline'; // Import the XMarkIcon for closing modal

// import AuthModal from "./AuthModel";

// export default function Navbar() {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLoginSuccess = (response) => {
//     console.log("Login Success:", response);
//     // Handle the login success here (e.g., save the token, authenticate the user, etc.)
//   };

//   const handleLoginFailure = (error) => {
//     console.error("Login Failed:", error);
//     // Handle the login failure here
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email:", email, "Password:", password);
//     // You can add your regular login logic here (e.g., authenticate with an API)
//   };

//   return (
//     <GoogleOAuthProvider clientId="540382082866-rpki92m7ce9nvnaf67dig2mnja0rvufq.apps.googleusercontent.com">
//       <nav className="bg-black/95 text-white shadow-lg fixed w-full top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Left Side: Hamburger Icon and Logo */}
//             <div className="flex items-center space-x-8">
//               {/* Hamburger icon visible on small screens */}
//               <div className="md:hidden flex items-center">
//                 <button onClick={toggleMenu} className="text-white">
//                   <svg
//                     className="h-6 w-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Logo */}
//               <a
//                 href="/"
//                 className="flex items-center space-x-2 logo-container group"
//               >
//                 <Film className="h-8 w-8 text-orange-500 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-orange-400 drop-shadow-md" />
//                 <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300 ease-in-out drop-shadow-md">
//                   Hovie
//                 </span>
//               </a>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex space-x-6">
//               <a
//                 href="/movies"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Movies
//               </a>
//               <a
//                 href="/showtimes"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Showtimes
//               </a>
//               <a
//                 href="/lists"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Lists
//               </a>
//               <a
//                 href="/groups"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Groups
//               </a>
//             </div>

//             {/* Right Side: Login and Signup Buttons */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowLoginModal(true)}
//                 className="px-4 py-2 text-sm font-medium text-white hover:text-orange-500 transition-colors"
//               >
//                 Log in
//               </button>
//               <button
//                 onClick={() => setShowSignupModal(true)}
//                 className="px-4 py-2 text-sm font-medium bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
//               >
//                 Sign up
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Login Modal with Form (Email, Password, and Google Login) */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-md w-96 shadow-lg relative">
//             {/* Close Button */}
//             <button
//               onClick={() => setShowLoginModal(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               <XMarkIcon className="h-6 w-6" />
//             </button>

//             <h2 className="text-2xl text-gray-700 flex justify-center items-center font-bold mb-4">
//               Login
//             </h2>
//             <form onSubmit={handleSubmit}>
//               {/* Email Field with Icon */}
//               <div className="mb-4 relative">
//                 <label htmlFor="email" className="block text-sm font-medium">
//                   Email
//                 </label>
//                 <div className="mt-2 relative">
//                   <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Field with Icon */}
//               <div className="mb-4 relative">
//                 <label htmlFor="password" className="block text-sm font-medium">
//                   Password
//                 </label>
//                 <div className="mt-2 relative">
//                   <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
//                   <input
//                     type="password"
//                     id="password"
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-blue-600"
//               >
//                 Login
//               </button>
//             </form>

//             {/* Google Login Button Below the Login Button */}
//             <div className="mt-4">
//               <GoogleLogin
//                 onSuccess={handleLoginSuccess}
//                 onError={handleLoginFailure}
//                 useOneTap
//                 shape="pill" // Customize the appearance if desired
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu (Hidden by default) */}
//       <div
//         className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-black/90 absolute top-16 left-0 w-full p-4 z-40`}
//       >
//         <div className="flex flex-col items-start space-y-4 mt-4 px-4 ">
//           <a href="/movies" className="text-white hover:text-orange-500">
//             Movies
//           </a>
//           <a href="/showtimes" className="text-white hover:text-orange-500">
//             Showtimes
//           </a>
//           <a href="/lists" className="text-white hover:text-orange-500">
//             Lists
//           </a>
//           <a href="/groups" className="text-white hover:text-orange-500">
//             Groups
//           </a>
//         </div>
//       </div>

//       {/* Sign Up Modal */}
//       <AuthModal
//         isOpen={showSignupModal}
//         onClose={() => setShowSignupModal(false)}
//         type="signup"
//       />
//     </GoogleOAuthProvider>
//   );
// }





import React, { useState } from "react";
import { Film, MailIcon } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Correct imports
import AuthModal from "./AuthModel";

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <GoogleOAuthProvider clientId="your-google-client-id">
      <nav className="bg-black/95 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </button>
              </div>

              <a href="/" className="flex items-center space-x-2 logo-container group">
                <Film className="h-8 w-8 text-orange-500 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-orange-400 drop-shadow-md"/>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300 ease-in-out drop-shadow-md">
                  Hovie
                </span>
              </a>
            </div>

            <div className="hidden md:flex space-x-6">
              <a href="/movies" className="hover:text-orange-500 transition-colors">Movies</a>
              <a href="/showtimes" className="hover:text-orange-500 transition-colors">Showtimes</a>
              <a href="/lists" className="hover:text-orange-500 transition-colors">Lists</a>
              <a href="/groups" className="hover:text-orange-500 transition-colors">Groups</a>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => setShowLoginModal(true)} className="px-4 py-2 text-sm font-medium text-white hover:text-orange-500 transition-colors">Log in</button>
              <button onClick={() => setShowSignupModal(true)} className="px-4 py-2 text-sm font-medium bg-orange-500 rounded-md hover:bg-orange-600 transition-colors">Sign up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 shadow-lg relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-6 w-6"/>
            </button>

            <h2 className="text-2xl text-gray-700 flex justify-center items-center font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <div className="mt-2 relative">
                  <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500"/>
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 text-gray-800"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <div className="mt-2 relative">
                  <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500"/>
                  <input
                    type="password"
                    id="password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 text-gray-800"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
            </form>

            <div className="mt-4">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                useOneTap
                shape="pill"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-black/90 absolute top-16 left-0 w-full p-4 z-40`}>
        <div className="flex flex-col items-start space-y-4 mt-4 px-4">
          <a href="/movies" className="text-white hover:text-orange-500">Movies</a>
          <a href="/showtimes" className="text-white hover:text-orange-500">Showtimes</a>
          <a href="/lists" className="text-white hover:text-orange-500">Lists</a>
          <a href="/groups" className="text-white hover:text-orange-500">Groups</a>
        </div>
      </div>

      {/* Sign Up Modal */}
      <AuthModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} type="signup"/>
    </GoogleOAuthProvider>
  );
}
