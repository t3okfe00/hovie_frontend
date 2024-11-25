import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "./LoadingSpinner";
// Define types for the props
interface Actor {
  id: number;
  profile_path: string | null;
  character: string;
  original_name: string;
}

interface MovieCredits {
  cast: Actor[];
}

interface CastCarouselProps {
  movieCredits: MovieCredits | null;
  isLoadingCast: boolean;
  isErrorCast: boolean;
}

const CastCarousel: React.FC<CastCarouselProps> = ({
  movieCredits,
  isLoadingCast,
  isErrorCast,
}) => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-lg font-semibold sm:text-xl">Cast</h2>
      <Carousel>
        {isLoadingCast && <LoadingSpinner />}
        {isErrorCast && (
          <div className="text-red-500">
            There was an error loading the cast...
          </div>
        )}
        <CarouselContent>
          {movieCredits?.cast?.slice(0, 10).map((actor) => (
            <CarouselItem
              key={actor.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <Card className="border-0 bg-gray-900">
                <CardContent className="p-2">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={`Cast Member ${actor.id + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-2 text-sm">
                    <div className="font-medium">{actor.character}</div>
                    <div className="text-gray-400">{actor.original_name}</div>
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
  );
};

export default CastCarousel;
