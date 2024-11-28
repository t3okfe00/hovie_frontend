import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MoviesPage } from "./pages/movies";
import { Groups } from "./pages/groups";
import { GroupPage } from "@/pages/groupPage"; // Import the GroupPage component
import HomePage from "./pages/HomePage"; // Import HomePage to use in the Router
import { MovieDetails } from "./pages/moviedetails";
import Showtimes from "./pages/showtimes";
import Navbar from "@/components/Navbar.tsx";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ProtectedRoute } from "./pages/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar /> {/* Ensure Navigation is visible */}
      <Routes>
        <Route path="/" element={<HomePage />} />{" "}
        {/* HomePage is rendered at root path */}
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetails />}></Route>
        <Route path="/showtimes" element={<Showtimes />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/group/:id" element={<GroupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
