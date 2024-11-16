import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const movies = [
  {
    title: "Inception",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
    year: 2010,
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
  },
  {
    title: "The Shawshank Redemption",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    year: 1994,
    rating: 9.3,
    genres: ["Drama"],
  },
  {
    title: "The Dark Knight",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
  },
  // Add more movies as needed
];

export function MoviesPage() {
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState([1990, 2024]);
  const [ratingRange, setRatingRange] = useState([0, 10]);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenres =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) => movie.genres.includes(genre));
    const matchesYear =
      movie.year >= yearRange[0] && movie.year <= yearRange[1];
    const matchesRating =
      movie.rating >= ratingRange[0] && movie.rating <= ratingRange[1];

    return matchesSearch && matchesGenres && matchesYear && matchesRating;
  });

  return (
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
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Genres</h4>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {genres.map((genre) => (
                        <div
                          key={genre}
                          className="flex items-center gap-2"
                          onClick={() => {
                            setSelectedGenres((prev) =>
                              prev.includes(genre)
                                ? prev.filter((g) => g !== genre)
                                : [...prev, genre]
                            );
                          }}
                        >
                          <Badge
                            variant={
                              selectedGenres.includes(genre)
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer"
                          >
                            {genre}
                          </Badge>
                        </div>
                      ))}
                    </div>
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
                  <Select defaultValue="popularity">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie, index) => (
            <div key={index} className="space-y-2">
              <div className="aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-medium truncate">{movie.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{movie.year}</span>
                  <span>★ {movie.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
