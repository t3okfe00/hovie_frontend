import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Movie } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortMovies = (selectedSort: string) => {
  return (a: Movie, b: Movie) => {
    if (selectedSort === "popularity") {
      return b.popularity - a.popularity;
    }
    if (selectedSort === "rating") {
      return b.vote_average - a.vote_average;
    }
    if (selectedSort === "release") {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    }
    if (selectedSort === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  };
};

export const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
