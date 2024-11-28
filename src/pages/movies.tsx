import { useState } from "react";
import { Search, Filter, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/types";
import { sortMovies } from "@/lib/utils";
import { MoviesList } from "@/components/common/MoviesList";
import { MoviesPagination } from "@/components/common/MoviesPagination";
import LoadingSpinner from "@/components/common/LoadingSpinner";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filters } from "@/components/common/Filters";
import { useAuth } from "@/hooks/useAuth";
const BASE_URL = "http://localhost:3000/movie";

export function MoviesPage() {
  const [page, setPage] = useState<number>(1); // New state for pagination
  const [, setPageCount] = useState<number>(0); // New state for pagination
  const [isSearchMode, setIsSearchMode] = useState(false); // Tracks if search is active

  const [searchResults, setSearchResults] = useState<Movie[]>([]); // New state for search results

  const [tempSearch, setTempSearch] = useState("");

  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [yearRange, setYearRange] = useState([1900, 2024]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [selectedSort, setSelectedSort] = useState(""); // Default sort option

  const { user, token } = useAuth();

  const {
    data: genres,
    isError: isGenresError,
    isLoading: isGenresLoading,
  } = useQuery({
    queryKey: ["genres", token],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/genres`, {
        credentials: "include",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Fetched genres", data);
      return data;
    },
    staleTime: 1000 * 60 * 20, // 5 minutes
    retry: 3,
  });

  const {
    data: movies,
    isError: isMoviesError,
    isLoading: isMoviesLoading,
  } = useQuery({
    queryKey: ["movies", isSearchMode, page, search, token],
    queryFn: async () => {
      const endpoint = isSearchMode
        ? `${BASE_URL}/search?query=${search}&language=en-US&page=${page}` // Search API
        : `${BASE_URL}/popular?page=${page}&language=en-US`; // Popular movies API
      const response = await fetch(endpoint, {
        credentials: "include",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      const normalizedTotalPages = isSearchMode
        ? data.total_pages // Use API's total_pages for search
        : Math.min(data.total_pages, 500); // Cap at 500 for popular movies

      setPageCount(normalizedTotalPages);

      return {
        results: data.results,
        totalPages: normalizedTotalPages, // Include total_pages in the return
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });

  const resetFilters = () => {
    setSearch("");
    setIsSearchMode(false); // Switch back to popular movies

    setSelectedGenres([]);
    setYearRange([1900, 2024]);
    setRatingRange([0, 10]);
    setSelectedSort("popularity");
    setSearchResults([]); // Clear search results when resetting filters
  };

  const handleSearchClick = async (e: React.MouseEvent) => {
    resetFilters();
    e.preventDefault();
    setSearch(tempSearch);
    setIsSearchMode(true); // Enable search mode

    setPage(1); // Reset to the first page of search results
  };

  const { results, totalPages } = movies || {};
  const moviesToDisplay = searchResults.length > 0 ? searchResults : results;

  const filteredMovies = moviesToDisplay
    ? moviesToDisplay
        .filter((movie: Movie) => {
          const matchesGenres =
            selectedGenres.length === 0 ||
            selectedGenres.some((genreId) => movie.genre_ids.includes(genreId));
          const matchesYear =
            parseInt(movie.release_date) >= yearRange[0] &&
            parseInt(movie.release_date) <= yearRange[1];
          const matchesRating =
            movie.vote_average >= ratingRange[0] &&
            movie.vote_average <= ratingRange[1];

          return matchesGenres && matchesYear && matchesRating;
        })
        .sort(sortMovies(selectedSort)) // Apply sorting based on selectedSort
    : [];

  return (
    <div>
      {(isGenresError || isMoviesError) && (
        <div className="flex items-center justify-center min-h-screen bg-red-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {isGenresError ? "Genres Fetch Error" : "Movies Fetch Error"}
            </h1>
            <p className="text-red-700 mb-6">
              {isGenresError
                ? "Unable to load movie genres. This may affect filtering capabilities."
                : "Unable to load movies. Please check your connection or try again later."}
            </p>
            {(isGenresError ? isGenresError : isMoviesError) && (
              <div className="bg-red-100 p-4 rounded-md text-red-800 text-sm">
                <p>You are not Authorized to see this page</p>
              </div>
            )}
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 w-full"
            >
              Retry Loading
            </Button>
          </div>
        </div>
      )}
      {!isGenresError && !isMoviesError && isGenresLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen bg-background pt-16 my-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search movies..."
                  value={tempSearch} // Controlled by local state
                  onChange={(e) => setTempSearch(e.target.value)} // Update local state
                  className="pl-10"
                />
              </div>

              <Button variant="outline" onClick={handleSearchClick}>
                Search
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Movies</SheetTitle>
                  </SheetHeader>
                  <div className="flex justify-end">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                  <Filters
                    genres={genres}
                    selectedGenres={selectedGenres}
                    yearRange={yearRange}
                    setYearRange={setYearRange}
                    ratingRange={ratingRange}
                    setRatingRange={setRatingRange}
                    selectedSort={selectedSort}
                    setSelectedGenres={setSelectedGenres}
                    setSelectedSort={setSelectedSort}
                  ></Filters>
                </SheetContent>
              </Sheet>
            </div>
            {!isSearchMode && filteredMovies.length != 0 && (
              <h1 className="text-2xl font-bold text-orange-500 mb-6">
                Popular Movies
              </h1>
            )}

            {isMoviesLoading ? (
              <LoadingSpinner />
            ) : (
              <MoviesList movies={filteredMovies} />
            )}

            <MoviesPagination
              pageCount={totalPages}
              onPageChange={(newPage) => setPage(newPage.selected + 1)}
              currentPage={page}
            ></MoviesPagination>
          </div>
        </div>
      )}
    </div>
  );
}
