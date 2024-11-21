import { Movie } from "@/types";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const RecommendedMovies = ({
  similarMovies,
  isErrorSimilarMovies,
  baseImageUrl,
  isLoadingSimilarMovies,
}: {
  similarMovies?: Movie[];
  isErrorSimilarMovies: boolean;
  baseImageUrl: string;
  isLoadingSimilarMovies: boolean;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold sm:text-xl text-center text-orange-500">
        Recommended Movies
      </h2>
      <ScrollArea className="h-[50vh] pr-4 lg:h-[calc(100vh-100px)]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {isErrorSimilarMovies && <h1>Ups Error</h1>}
          {isLoadingSimilarMovies ? (
            <h1>Loading</h1>
          ) : (
            similarMovies?.map((movie) => {
              return (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="block"
                >
                  <Card className="border-0 bg-gray-900 transition-colors hover:bg-gray-800">
                    <CardContent className="p-2">
                      <div className="aspect-[16/9] overflow-hidden rounded-lg">
                        <img
                          src={`${baseImageUrl}w500${movie?.backdrop_path}`}
                          alt={`Movie ${movie.id + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="mt-2">
                        <div className="font-medium">{movie.title}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{movie.release_date}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                            <span>{movie.vote_average}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecommendedMovies;
