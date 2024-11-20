import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Movie } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import MoviePlayer from "@/components/common/MoviePlayer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

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
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Movie Title and Rating */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-orange-500 sm:text-3xl lg:text-4xl">
                {movie.title}
              </h1>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                <span className="text-lg font-semibold">
                  {movie.vote_average}
                </span>
              </div>
            </div>

            {/* Trailer Video Section */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center"></div>
              <MoviePlayer
                videoKey={video?.[0]?.key}
                fullBackdropUrl={fullBackdropUrl}
              />
            </div>

            {/* Overview */}
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

            {/* Cast Carousel */}
            <div className="w-full">
              <h2 className="mb-4 text-lg font-semibold sm:text-xl">Cast</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                    >
                      <Card className="border-0 bg-gray-900">
                        <CardContent className="p-2">
                          <div className="aspect-square overflow-hidden rounded-lg">
                            <img
                              src="/placeholder.svg"
                              alt={`Cast Member ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="font-medium">Actor Name</div>
                            <div className="text-gray-400">Character</div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>

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

          {/* Right Column - Recommendations */}
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
        </div>
      </div>
    </div>
  );
}
