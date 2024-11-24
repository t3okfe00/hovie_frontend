import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MoviesPage } from "./pages/movies";

import HomePage from "./pages/HomePage"; // Import HomePage to use in the Router
import Navbar from "./components/navbar";

import { MovieDetails } from "./pages/moviedetails";
import Showtimes from "./pages/showtimes";

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
