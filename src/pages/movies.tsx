/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Genre, Movie } from "@/types";

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
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState([1990, 2024]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [selectedSort, setSelectedSort] = useState("popularity"); // Default sort option

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
  });

  const {
    data: movies,
    isError: isMoviesError,
    isLoading: isMoviesLoading,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/popular?page=3&language=en-US`);
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      console.log("Movie Data", movies);

      return data;
    },
  });
  const sortMovies = (selectedSort: string) => {
    return (a: Movie, b: Movie) => {
      if (selectedSort === "popularity") {
        return b.popularity - a.popularity;
      }
      if (selectedSort === "rating") {
        return b.vote_average - a.vote_average;
      }
      if (selectedSort === "release") {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      }
      if (selectedSort === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    };
  };

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedGenres([]);
    setYearRange([1990, 2024]);
    setRatingRange([0, 10]);
    setSelectedSort("popularity");
  };

  console.log("BEFORE FILTER", movies);
  const filteredMovies = movies
    ? movies?.results
        ?.filter((movie: Movie) => {
          console.log("Movie Title", movie.title);
          const matchesSearch = movie.title
            .toLowerCase()
            .includes(search.toLowerCase());
          const matchesGenres =
            selectedGenres.length === 0 ||
            selectedGenres.some((genre) =>
              movie.genre_ids.includes(
                genres.genres.find((g) => g.name === genre)?.id
              )
            );
          const matchesYear =
            parseInt(movie.release_date) >= yearRange[0] &&
            parseInt(movie.release_date) <= yearRange[1];
          const matchesRating =
            movie.vote_average >= ratingRange[0] &&
            movie.vote_average <= ratingRange[1];

          return matchesSearch && matchesGenres && matchesYear && matchesRating;
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                                    prev.includes(genre.name)
                                      ? prev.filter((g) => g !== genre.name)
                                      : [...prev, genre.name]
                                  );
                                }}
                              >
                                <Badge
                                  variant={
                                    selectedGenres.includes(genre.name)
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
            {isMoviesLoading ? (
              <h1>Loading</h1>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredMovies.map((movie: Movie, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="aspect-[2/3] overflow-hidden rounded-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>

                    <div>
                      <h3 className="font-medium truncate">{movie.title}</h3>
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
          </div>
        </div>
      )}
    </div>
  );
}
