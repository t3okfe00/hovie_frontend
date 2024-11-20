import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MovieDetails() {
  return (
    <div className="mx-auto px-4 py-6">
      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Movie Title and Rating */}
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold md:text-4xl text-orange-500`}>
              Venom: The Last Dance
            </h1>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
              <span className="text-lg font-semibold">8.5</span>
            </div>
          </div>

          {/* Trailer Video Section */}
          <div className="relative aspect-video w-1/2 rounded-xl bg-gray-900 mx-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-2 border-white bg-black/50 text-white hover:bg-black/70"
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
            <Image
              src="/placeholder.svg"
              alt="Movie Thumbnail"
              className="object-cover"
              fill
              priority
            />
          </div>

          {/* Cast Carousel */}
          <div className="w-1/2 mx-10">
            <h2 className={`mb-4 text-xl font-semibold`}>Cast</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                  >
                    <Card className="border-0 bg-gray-900">
                      <CardContent className="p-2">
                        <div className="aspect-square overflow-hidden rounded-lg">
                          <Image
                            src="/placeholder.svg"
                            alt={`Cast Member ${index + 1}`}
                            className="object-cover"
                            width={200}
                            height={200}
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
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Reviews Section */}
          <div>
            <h2 className={`mb-4 text-xl font-semibold`}>Reviews</h2>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="border-0 bg-gray-900">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-800">
                        <Image
                          src="/placeholder.svg"
                          alt="User Avatar"
                          width={40}
                          height={40}
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
                    <p className="mt-4 text-gray-300">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations Sidebar */}
        <div className="space-y-4">
          <h2 className={`text-xl font-semibold`}>Recommended Movies</h2>
          <ScrollArea className="h-[calc(100vh-100px)] pr-4">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Link key={index} href="#" className="block">
                  <Card className="border-0 bg-gray-900 transition-colors hover:bg-gray-800">
                    <CardContent className="p-2">
                      <div className="aspect-[16/9] overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg"
                          alt={`Movie ${index + 1}`}
                          className="object-cover"
                          width={300}
                          height={169}
                        />
                      </div>
                      <div className="mt-2">
                        <div className="font-medium">Movie Title</div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>2024</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                            <span>8.5</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
