import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Genre } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FiltersProps {
  genres: { genres: Genre[] };
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
  yearRange: number[];
  setYearRange: React.Dispatch<React.SetStateAction<number[]>>;
  ratingRange: number[];
  setRatingRange: React.Dispatch<React.SetStateAction<number[]>>;
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
}

export const Filters: FC<FiltersProps> = ({
  genres,
  selectedGenres,
  setSelectedGenres,
  yearRange,
  setYearRange,
  ratingRange,
  setRatingRange,
  selectedSort,
  setSelectedSort,
}) => {
  return (
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
                      selectedGenres.includes(genre.id) ? "default" : "outline"
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
        <Select value={selectedSort} onValueChange={setSelectedSort}>
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
  );
};
