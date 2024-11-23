import { useParams } from "react-router-dom";

import { Movie, MovieCredits } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import MoviePlayer from "@/components/common/MoviePlayer";
import MovieOverview from "@/components/common/MovieOverview";
import MovieHeading from "@/components/common/MovieHeading";
import CastCarousel from "@/components/common/CastCarousel";
import { Star } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import RecommendedMovies from "@/components/common/RecommendedMovies";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const baseImageUrl = "https://image.tmdb.org/t/p/";
  const size = "w1280";
  const BASE_URL = "http://localhost:3000/movie";

  // Query for the video
  const {
    data: video,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
  } = useQuery({
    queryKey: ["videos", id],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/${id}/videos`);
      const data = await response.json();
      console.log("Fetched video data", data.results[0].key);
      return data.results;
    },
    staleTime: 1000 * 60 * 20, // 20 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  //Query for the recommandations
  const {
    data: similarMovies,
    isLoading: isLoadingSimilarMovies,
    isError: isErrorSimilarMovies,
  } = useQuery<Movie[]>({
    queryKey: ["similarMovies", id],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/${id}/similar`);
      const data = await response.json();
      console.log("Fetched similar movies data", data);
      return data.results;
    },
    staleTime: 1000 * 60 * 20, // 20 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  //Query for the movie
  const {
    data: movie = {} as Movie,
    isLoading,
    isError,
  } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      console.log("Fetched movie data", data);
      return data;
    },
    staleTime: 1000 * 60 * 20, // 20 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  //Query for the cast
  const {
    data: movieCredits,
    isLoading: isLoadingCast,
    isError: isErrorCast,
  } = useQuery<MovieCredits>({
    queryKey: ["cast", id],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/${id}/credits`);
      const data = await response.json();
      console.log("Fetched cast data", data);
      return data;
    },
    staleTime: 1000 * 60 * 20, // 20 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  const backdropPath = movie.backdrop_path;
  const fullBackdropUrl = `${baseImageUrl}${size}${backdropPath}`;

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-lg text-red-500">
          There was an error loading the movie...
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 my-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <MovieHeading movie={movie} />

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center"></div>
              <MoviePlayer
                videoKey={video?.[0]?.key}
                fullBackdropUrl={fullBackdropUrl}
                isLoadingVideos={isLoadingVideos}
                isErrorVideos={isErrorVideos}
              />
            </div>
            <MovieOverview movie={movie} />

            <CastCarousel
              movieCredits={movieCredits ?? null}
              isLoadingCast={isLoadingCast}
              isErrorCast={isErrorCast}
            />

            {/* Reviews Section */}
            <div>
              <h2 className="mb-4 text-lg font-semibold sm:text-xl">Reviews</h2>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="border-0 bg-gray-900">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-800 sm:h-12 sm:w-12">
                          <img
                            src="/placeholder.svg"
                            alt="User Avatar"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">User Name</div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                            <span className="text-sm text-gray-400">4.5</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-gray-300 sm:text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/*Recommendations */}
          <RecommendedMovies
            similarMovies={similarMovies}
            isErrorSimilarMovies={isErrorSimilarMovies}
            isLoadingSimilarMovies={isLoadingSimilarMovies}
            baseImageUrl={baseImageUrl}
          ></RecommendedMovies>
        </div>
      </div>
    </div>
  );
}
