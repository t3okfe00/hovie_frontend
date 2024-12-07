import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Film, Search } from 'lucide-react';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandEmpty,
} from '@/components/ui/command';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/types';

const BASE_URL = "http://localhost:3000/movie";

interface MovieSuggestionButtonProps {
    onMovieSelect: (movie: Movie) => void;
}

export function MovieSuggestionButton({ onMovieSelect }: Readonly<MovieSuggestionButtonProps>) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const { data: searchResults, isError } = useQuery({
        queryKey: ["searchMovies", search],
        queryFn: async () => {
            if (!search) return [];
            const response = await fetch(`${BASE_URL}/search?query=${search}&language=en-US`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data.results;
        },
        enabled: !!search,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3,
    });

    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMovie) return;

        onMovieSelect(selectedMovie);
        setOpen(false);
        setSelectedMovie(null);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Film className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Share a Movie</DialogTitle>
                        <DialogDescription>
                            Search for a movie to share in the chat.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search for a movie..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        {selectedMovie && (
                            <div className="flex items-center gap-2 p-2 border rounded-md">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
                                    alt={selectedMovie.title}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{selectedMovie.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(selectedMovie.release_date).getFullYear()}
                                    </p>
                                </div>
                            </div>
                        )}
                        {isError ? (
                            <p>Error loading movies. Please try again later.</p>
                        ) : (
                            <Command className="border rounded-md max-h-60 overflow-y-auto">
                                <CommandList>
                                    <CommandEmpty>No movies found.</CommandEmpty>
                                    <CommandGroup>
                                        {searchResults?.map((movie: Movie) => (
                                            <CommandItem
                                                key={movie.id}
                                                onSelect={() => handleMovieSelect(movie)}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                                    alt={movie.title}
                                                    className="w-8 h-8 object-cover rounded"
                                                />
                                                <span>
                                                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={!selectedMovie}>
                            Share Movie
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}