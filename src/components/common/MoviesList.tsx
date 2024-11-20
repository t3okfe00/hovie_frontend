// MoviesList.tsx
import { FC } from "react";
import { MovieCard } from "./MovieCard";
import { Movie } from "@/types";

interface MoviesListProps {
  movies: Movie[];
}

export const MoviesList: FC<MoviesListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
