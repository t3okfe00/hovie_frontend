import { useEffect, useState } from "react";
import { FeatureSection } from "../components/feature-section";
import ReactPaginate from "react-paginate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCarousel from "@/components/MovieCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import  Footer  from "../components/Footer";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Movie {
  id: number;
  title: string;
  images: string[];
  releaseDate: string;
  voteAverage: number;
  genres: string[];
}

function MovieRow({ title, movies }: { title: string; movies: Movie[] }) {
    // Slice movies to show only the first 6
    const displayedMovies = movies.slice(0, 6);
  
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <ScrollArea>
            {/* Grid layout */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 pb-4">
              {displayedMovies.map((movie) => (
                <Card
                  key={movie.id}
                  className="overflow-hidden group cursor-pointer bg-gray-800 text-white transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    {movie.images.length > 0 ? (
                      <img
                        src={movie.images[1]}
                        alt={movie.title}
                        className="w-full h-[150px] sm:h-[200px] md:h-[250px] object-cover transition-all duration-300 group-hover:opacity-80"
                      />
                    ) : (
                      <div className="w-full h-[200px] bg-gray-700 flex items-center justify-center">
                        <span>No image</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                      <p className="text-sm text-gray-400">{movie.releaseDate}</p>
                      <p className="text-sm text-yellow-500 mt-2">⭐ {movie.voteAverage?.toFixed(1)}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {movie.genres?.map((genre, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    );
  }
  

function HomePage() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [showingMovies, setShowingMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loadingPopular, setLoadingPopular] = useState<boolean>(true);
  const [loadingNowShowing, setLoadingNowShowing] = useState<boolean>(true);

  const fetchMovies = async (endpoint: string, page: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${endpoint}?api_key=${API_KEY}&page=${page}&append_to_response=genres`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setTotalPages(data.total_pages);

      const moviesWithDetails = await Promise.all(
        data.results.map(async (movie: any) => {
          const detailsResponse = await fetch(
            `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`
          );
          const details = await detailsResponse.json();
          
          return {
            id: movie.id,
            title: movie.title,
            images: [
              `${IMAGE_BASE_URL}${movie.backdrop_path}`,
              `${IMAGE_BASE_URL}${movie.poster_path}`
            ].filter(Boolean),
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            genres: details.genres?.map((g: { name: string }) => g.name) || []
          };
        })
      );
      return moviesWithDetails;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  const loadMovies = async () => {
    setLoadingPopular(true);
    const popular = await fetchMovies("movie/popular", currentPage);
    setPopularMovies(popular);
    setLoadingPopular(false);

    setLoadingNowShowing(true);
    const showing = await fetchMovies("movie/now_playing", 1);
    setShowingMovies(showing);
    setLoadingNowShowing(false);
  };

  useEffect(() => {
    loadMovies();
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <main>
      <MovieCarousel movies={showingMovies} isLoading={loadingNowShowing} />
      <FeatureSection />

      {loadingPopular ? (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[250px] bg-gray-800 rounded overflow-hidden"
                  >
                    <div className="h-[200px] bg-gray-700 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-700 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      ) : (
        <MovieRow title="Popular Movies" movies={popularMovies} />
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.min(totalPages, 300)}
        previousLabel="<"
        containerClassName="pagination flex justify-center space-x-4 my-8"
        pageClassName="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        activeClassName="bg-orange-500"
        disabledClassName="opacity-50 cursor-not-allowed"
        previousClassName="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        nextClassName="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
      />
      <Footer />
    </main>
  );
}

export default HomePage;