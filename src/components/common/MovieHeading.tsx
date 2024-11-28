import { Movie } from "@/types";
import { Star } from "lucide-react";
import AddToFavorites from "./AddFavorites";
import { Toast } from "@radix-ui/react-toast";
import { ToastContainer } from "react-toastify";
const MovieHeading = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold text-orange-500 sm:text-3xl lg:text-4xl">
        {movie.title}
      </h1>
      <AddToFavorites movie={movie} />
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
        <span className="text-lg font-semibold">
          {movie.vote_average.toFixed(1)}
        </span>
      </div>
      <ToastContainer
        position="top-center" // Toast will appear at the top-center of the screen
        autoClose={3000} // Toast will close automatically after 3 seconds
        hideProgressBar={false} // Hide the progress bar
        closeButton={false} // Hide close button
        toastStyle={{
          backgroundColor: "#fff", // Orange background
          color: "black", // White text
          borderRadius: "8px", // Optional: Rounded corners
        }}
      />
    </div>
  );
};

export default MovieHeading;
