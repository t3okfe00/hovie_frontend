import { Movie } from "@/types";
import { Star } from "lucide-react";

const MovieHeading = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold text-orange-500 sm:text-3xl lg:text-4xl">
        {movie.title}
      </h1>
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
        <span className="text-lg font-semibold">{movie.vote_average}</span>
      </div>
    </div>
  );
};

export default MovieHeading;
