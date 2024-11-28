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
import { Label } from '@/components/ui/label';
import { Film, Search } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Card } from '@/components/ui/card';

// Mock movie data - in a real app, this would come from an API
const mockMovies = [
    {
        id: '1',
        title: 'The Godfather',
        year: '1972',
        poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200',
    },
    {
        id: '2',
        title: 'Pulp Fiction',
        year: '1994',
        poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200',
    },
    {
        id: '3',
        title: 'The Dark Knight',
        year: '2008',
        poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200',
    },
];

interface Movie {
    id: string;
    title: string;
    year: string;
    poster: string;
}

interface MovieSuggestionButtonProps {
    onMovieSelect: (movie: Movie) => void;
}

export function MovieSuggestionButton({ onMovieSelect }: MovieSuggestionButtonProps) {
    const [open, setOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie);
        setSearchOpen(false);
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
                        <div className="grid gap-2">
                            <Label>Search Movie</Label>
                            <div className="relative">
                                <Button
                                    type="button"
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={searchOpen}
                                    className="w-full justify-between"
                                    onClick={() => setSearchOpen(!searchOpen)}
                                >
                                    {selectedMovie ? (
                                        <span className="flex items-center gap-2">
                      <img
                          src={selectedMovie.poster}
                          alt={selectedMovie.title}
                          className="w-6 h-6 object-cover rounded"
                      />
                                            {selectedMovie.title} ({selectedMovie.year})
                    </span>
                                    ) : (
                                        <span className="text-muted-foreground">Search for a movie...</span>
                                    )}
                                    <Search className="w-4 h-4 ml-2 shrink-0 opacity-50" />
                                </Button>
                                {searchOpen && (
                                    <Card className="absolute top-full mt-1 w-full z-50">
                                        <Command>
                                            <CommandInput placeholder="Type to search..." />
                                            <CommandList>
                                                <CommandEmpty>No movies found.</CommandEmpty>
                                                <CommandGroup heading="Suggestions">
                                                    {mockMovies.map((movie) => (
                                                        <CommandItem
                                                            key={movie.id}
                                                            onSelect={() => handleMovieSelect(movie)}
                                                            className="flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <img
                                                                src={movie.poster}
                                                                alt={movie.title}
                                                                className="w-8 h-8 object-cover rounded"
                                                            />
                                                            <span>
                                {movie.title} ({movie.year})
                              </span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </Card>
                                )}
                            </div>
                        </div>
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