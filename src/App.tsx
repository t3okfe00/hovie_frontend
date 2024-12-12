import { Routes, Route } from "react-router-dom";
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
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";

import Chatbot from "./components/Chatbot";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./pages/ProtectedRoute"; // Assuming ProtectedRoute is a guard for auth
import ShowtimeCard from "./components/ShowtimeCard";

function App() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <ToastContainer
          icon={false}
          position="top-center"
          toastClassName={() =>
            "relative flex items-center justify-center p-4 rounded-lg bg-white text-orange-500 shadow-lg z-50"
          }
          bodyClassName={() => "text-lg text-center font-medium"}
          closeButton={false} // Removes the default close button
          progressClassName="bg-orange-500"
        />
        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Movies and Details */}
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Showtimes */}
          <Route path="/showtimes" element={<Showtimes />} />

          {/* Group and GroupPage */}
          <Route path="/groupPage/:id" element={<GroupPage />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:id" element={<GroupPage />} />

          {/* Profile Routes */}
          {/* For logged-in users, the ProtectedRoute ensures authentication is checked */}
          <Route
            path="/profiles/users/:userId"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Profile Route (non-protected for sharing links) */}
          <Route path="/lists/:userId" element={<ProfilePage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Chatbot />
      <ShowtimeCard></ShowtimeCard>
      <Footer />
    </>
  );
}

export default App;
