import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/types";
import { sortMovies } from "@/lib/utils";
import { MoviesList } from "@/components/common/MoviesList";
import { MoviesPagination } from "@/components/common/MoviesPagination";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filters } from "@/components/common/Filters";
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

  const {
    data: genres,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/genres`);
      const data = await response.json();

      return data;
    },
    staleTime: 1000 * 60 * 20, // 5 minutes
  });

  const {
    data: movies,
    isError: isMoviesError,
    isLoading: isMoviesLoading,
  } = useQuery({
    queryKey: ["movies", isSearchMode, page, search],
    queryFn: async () => {
      const endpoint = isSearchMode
        ? `${BASE_URL}/search?query=${search}&language=en-US&page=${page}` // Search API
        : `${BASE_URL}/popular?page=${page}&language=en-US`; // Popular movies API
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch movies");
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
      {isError && <h1>Please try again later</h1>}
      {isMoviesError && <h1>Please try again later</h1>}
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="min-h-screen bg-background py-8">
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
              <h1>Loading</h1>
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
