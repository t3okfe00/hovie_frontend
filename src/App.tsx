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
import HomePage from "./pages/HomePage"; // This imports your HomePage function
import Navbar from "./components/Navbar";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { MovieDetails } from "./pages/moviedetails";
import { MovieGrid } from "./components/movie-grid";
import { HeroSection } from "./components/hero-section";
import { FeatureSection } from "./components/feature-section";
import Chatbot from "./components/Chatbot";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar /> {/* This keeps your navigation bar visible */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Use HomePage here */}
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetails />}></Route>
          <Route path="/lists" element={<ProfilePage />} />
          <Route path="/lists/:userId" element={<ProfilePage />} />
        </Routes>
      </div>
      <Chatbot />
    </Router>
    
  );
}

export default App;


