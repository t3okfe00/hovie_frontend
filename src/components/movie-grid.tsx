import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const movies = [
  {
    title: "Movie 1",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
  },
  {
    title: "Movie 2",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop",
  },
  {
    title: "Movie 3",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Movie 4",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Movie 5",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop",
  },
];

export function MovieGrid({ title }: { title: string }) {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {movies.map((movie, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-[200px] overflow-hidden"
              >
                <CardContent className="p-0">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-[300px] object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
