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
import { Textarea } from '@/components/ui/textarea';
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

export function SuggestMovieDialog() {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [description, setDescription] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovie) return;

    console.log({
      movie: selectedMovie,
      description,
    });

    setOpen(false);
    setSelectedMovie(null);
    setDescription('');
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setSearchOpen(false);
  };

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Film className="w-4 h-4 mr-2" />
            Suggest Movie
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Suggest a Movie</DialogTitle>
              <DialogDescription>
                Search for a movie and tell the group why they should watch it.
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
              {selectedMovie && (
                  <div className="grid gap-2">
                    <Label htmlFor="description">Why should we watch this?</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us why this movie would be great for the group..."
                        className="resize-none"
                        rows={4}
                    />
                  </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!selectedMovie || !description}>
                Suggest Movie
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
}