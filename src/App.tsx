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

import Chatbot from "./components/Chatbot";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetails />}></Route>
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/groupPage/:id" element={<GroupPage />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:id" element={<GroupPage />} />
          <Route
            path="/profiles/users/:userendpoint"
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
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
