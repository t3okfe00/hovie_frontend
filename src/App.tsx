import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import for React Query
import { Navigation } from "./components/ui/navigation";
import { HeroSection } from "./components/hero-section";
import { FeatureSection } from "./components/feature-section";
import { MovieGrid } from "./components/movie-grid";
import { MoviesPage } from "./pages/movies";
import { Groups } from "./pages/groups";
import { GroupPage } from "@/pages/groupPage"; // Import the GroupPage component

// Create a QueryClient instance
const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}> {/* Wrap the app with QueryClientProvider */}
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
        </QueryClientProvider>
    );
}

export default App;
