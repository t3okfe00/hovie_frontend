// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { MoviesPage } from "./pages/movies";
// import HomePage from "./pages/HomePage"; // Import HomePage to use in the Router
// import Navbar from "./components/navbar";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-background">
//         <Navbar /> {/* Ensure Navigation is visible */}
//         <Routes>
//           <Route path="/" element={<HomePage />} /> {/* HomePage is rendered at root path */}
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
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function App() {
  const handleLoginSuccess = (response) => {
    // The response contains the Google JWT token.
    console.log("Login Success:", response);

    // You can send this token to your server for verification and further processing.
    const idToken = response.credential;

    // Send `idToken` to your server to authenticate and get the user info.
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failure:", error);
  };

  return (
    <GoogleOAuthProvider clientId="540382082866-rpki92m7ce9nvnaf67dig2mnja0rvufq.apps.googleusercontent.com">
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar /> {/* Ensure Navigation is visible */}
          <div className="p-4">
            {/* Google Login Button */}
            <h2 className="text-2xl font-bold mb-4">Google Authentication</h2>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* HomePage is rendered at root path */}
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
