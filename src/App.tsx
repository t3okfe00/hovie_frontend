// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Navigation } from "./components/ui/navigation";
// import { HeroSection } from "./components/hero-section";
// import { FeatureSection } from "./components/feature-section";
// import { MovieGrid } from "./components/movie-grid";
// import { MoviesPage } from "./pages/movies";

// function HomePage() {
//   return (
//     <main>
//       <HeroSection />
//       <FeatureSection />
// <MovieGrid title="NOW SHOWING" />
// <MovieGrid title="PAPULAR MOVIE" />

//     </main>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-background">
//         <Navigation />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/movies" element={<MoviesPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MoviesPage } from "./pages/movies";
import HomePage from "./pages/HomePage"; // Import HomePage to use in the Router
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar /> {/* Ensure Navigation is visible */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* HomePage is rendered at root path */}
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
