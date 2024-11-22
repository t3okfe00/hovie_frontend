// MoviesList.tsx
import { FC } from "react";
import { MovieCard } from "./MovieCard";
import { Movie } from "@/types";
import { useNavigate } from "react-router-dom";

interface MoviesListProps {
  movies: Movie[];
}

export const MoviesList: FC<MoviesListProps> = ({ movies }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="hover:cursor-pointer"
        >
          <MovieCard key={movie.id} movie={movie} />
        </div>
      ))}
    </div>
  );
};
