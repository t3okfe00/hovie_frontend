// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { MoviesPage } from "./pages/movies";

// import HomePage from "./pages/HomePage"; // Import HomePage to use in the Router
// import Navbar from "./components/navbar";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// import { MovieDetails } from "./pages/moviedetails";
// import { MovieGrid } from "./components/movie-grid";
// import { HeroSection } from "./components/hero-section";
// import { FeatureSection } from "./components/feature-section";

// // function HomePage() {
// //   return (
// //     <main>
// //       <HeroSection />
// //       <FeatureSection />
// //       <MovieGrid title="NOW SHOWING" movies={[]} />
// //       <MovieGrid title="JUST REVIEWED" movies={[]} />
// //     </main>
// //   );
// // }

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-background">
//         <Navbar /> {/* Ensure Navigation is visible */}
//         <Routes>
//           <Route path="/" element={<HomePage />} /> {/* HomePage is rendered at root path */}
//           <Route path="/movies" element={<MoviesPage />} />
//           <Route path="/movie/:id" element={<MovieDetails />}></Route>
//         </Routes>
//       </div>
//     </Router>

//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MoviesPage } from "./pages/movies";
import { Groups } from "./pages/groups";
import { GroupPage } from "@/pages/groupPage"; // Import the GroupPage component
import HomePage from "./pages/HomePage"; // Import HomePage to use in the Router
import Navbar from "./components/Navbar";
import { MovieDetails } from "./pages/moviedetails";
import Showtimes from "./pages/showtimes";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";

import Chatbot from "./components/Chatbot";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar /> {/* Ensure Navigation is visible */}
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          {/* HomePage is rendered at root path */}
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetails />}></Route>
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/groupPage/:id" element={<GroupPage />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:id" element={<GroupPage />} />
          <Route
            path="/profiles"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/lists/:userId" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer />
      </div>
      <Chatbot />
    </>
  );
}

export default App;
