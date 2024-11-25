import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import for React Query
import { Navigation } from "./components/ui/navigation";
import { HeroSection } from "./components/hero-section";
import { FeatureSection } from "./components/feature-section";
import { MovieGrid } from "./components/movie-grid";
import { MoviesPage } from "./pages/movies";
import { Groups } from "./pages/groups";
import { GroupPage } from "@/pages/groupPage"; // Import the GroupPage component
import HomePage from "./pages/HomePage"; // Import HomePage to use in the Router
import Navbar from "./components/navbar";
import { MovieDetails } from "./pages/moviedetails";
import Showtimes from "./pages/showtimes";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar /> {/* Ensure Navigation is visible */}
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          {/* HomePage is rendered at root path */}
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetails />}></Route>
          <Route path="/showtimes" element={<Showtimes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
