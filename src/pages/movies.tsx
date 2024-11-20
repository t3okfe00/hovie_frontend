import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Genre, Movie } from "@/types";
import { sortMovies, genreMap } from "@/lib/utils";
import ReactPaginate from "react-paginate";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const BASE_URL = "http://localhost:3000/movie";

export function MoviesPage() {
  const [page, setPage] = useState<number>(1); // New state for pagination
  const [pageCount, setPageCount] = useState<number>(0); // New state for pagination
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
      console.log("Query function RETURN", data);

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
      console.log("Fetching data in movies use Query!", data.results);
      console.log("Response", data);

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

                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Genres</h4>

                      <ScrollArea className="h-[200px]">
                        {
                          <div className="space-y-2">
                            {genres.genres.map((genre: Genre) => (
                              <div
                                key={genre.id}
                                className="flex items-center gap-2"
                                onClick={() => {
                                  setSelectedGenres((prev) =>
                                    prev.includes(genre.id)
                                      ? prev.filter((g) => g !== genre.id)
                                      : [...prev, genre.id]
                                  );
                                }}
                              >
                                <Badge
                                  variant={
                                    selectedGenres.includes(genre.id)
                                      ? "default"
                                      : "outline"
                                  }
                                  className="cursor-pointer"
                                >
                                  {genre.name}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        }
                      </ScrollArea>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Release Year</h4>
                      <Slider
                        min={1900}
                        max={2024}
                        step={1}
                        value={yearRange}
                        onValueChange={setYearRange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{yearRange[0]}</span>
                        <span>{yearRange[1]}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Rating</h4>
                      <Slider
                        min={0}
                        max={10}
                        step={0.1}
                        value={ratingRange}
                        onValueChange={setRatingRange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{ratingRange[0].toFixed(1)}</span>
                        <span>{ratingRange[1].toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Sort By</h4>
                      <Select
                        value={selectedSort}
                        onValueChange={setSelectedSort}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sort order" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popularity">Popularity</SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                          <SelectItem value="release">Release Date</SelectItem>
                          <SelectItem value="title">Title</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredMovies.map((movie: Movie) => (
                  <div key={movie.id} className="space-y-2">
                    <div className="aspect-[2/3] overflow-hidden rounded-lg">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image"
                        }
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>

                    <div>
                      <h3 className="font-medium truncate">
                        {movie.title || "SOMETHING"}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                        <span>★ {movie.vote_average.toFixed(1)}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {movie.genre_ids.map((genreId) => (
                          <Badge
                            key={genreId}
                            variant="secondary"
                            className="text-xs"
                          >
                            {genreMap[genreId] || "Unknown"}{" "}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <ReactPaginate
              className="flex justify-center mt-8 space-x-2"
              breakLabel="..."
              nextLabel="next >"
              onPageChange={(selectedItem) =>
                setPage(selectedItem.selected + 1)
              }
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName="flex items-center space-x-2"
              pageClassName="px-3 py-1 border rounded hover:bg-gray-200"
              activeClassName="bg-blue-500 text-white"
              previousClassName="px-3 py-1 border rounded hover:bg-gray-200"
              nextClassName="px-3 py-1 border rounded hover:bg-gray-200"
              breakClassName="px-3 py-1"
              forcePage={page - 1}
            />
          </div>
        </div>
      )}
    </div>
  );
}
