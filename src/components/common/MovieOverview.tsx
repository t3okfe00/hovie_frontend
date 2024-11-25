import { Movie } from "@/types";

const MovieOverview = ({ movie }: { movie: Movie }) => {
  return (
    <div className="rounded-xl bg-gray-900/50 backdrop-blur-sm p-6 border border-gray-800/50 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r text-orange-400">
          Overview
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent"></div>
      </div>

      <p className="text-base sm:text-lg leading-relaxed text-gray-300 font-light">
        {movie.overview}
      </p>

      <div className="mt-6 flex gap-4 items-center">
        <div className="flex items-center text-sm text-gray-400">
          <span className="inline-flex items-center rounded-lg bg-gray-800 px-3 py-1">
            <span className="mr-2">🎭</span>
            {movie.genres?.map((genre, index) => (
              <span key={index}>
                {genre.name}
                {index < movie.genres.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-400">
          <span className="inline-flex items-center rounded-lg bg-gray-800 px-3 py-1">
            <span className="mr-2">⏱️</span>
            {movie.runtime || "120"} min
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-400">
          <span className="inline-flex items-center rounded-lg bg-gray-800 px-3 py-1">
            <span className="mr-2">📅</span>
            {movie.release_date?.split("-")[0] || "2024"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieOverview;
