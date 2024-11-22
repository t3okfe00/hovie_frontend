import { Movie } from "@/types";
import { Badge } from "@/components/ui/badge";
import { genreMap } from "@/lib/utils";
import { FC } from "react";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
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
        <h3 className="font-medium truncate">{movie.title || "SOMETHING"}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span>★ {movie.vote_average.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {movie.genre_ids.map((genreId) => (
            <Badge key={genreId} variant="secondary" className="text-xs">
              {genreMap[genreId] || "Unknown"}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
