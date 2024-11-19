import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/ui/navigation";
import { HeroSection } from "./components/hero-section";
import { FeatureSection } from "./components/feature-section";
import { MovieGrid } from "./components/movie-grid";
import { MoviesPage } from "./pages/movies";
import { Groups } from "./pages/groups";
import { GroupPage } from '@/pages/groupPage'; // Import the GroupPage component

function HomePage() {
    return (
        <main>
            <HeroSection />
            <FeatureSection />
            <MovieGrid title="NOW SHOWING" />
            <MovieGrid title="JUST REVIEWED" />
        </main>
    );
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/groupPage" element={<GroupPage />} /> {/* Add this route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;