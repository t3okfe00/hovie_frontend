import { useState } from "react";
import { Heart } from "lucide-react";
import { Movie } from "@/types";
import { saveFavorite } from "@/services/favorites";

const AddToFavorites = ({ movie }: { movie: Movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    setIsFavorite(!isFavorite);
    // Add logic to save favorite status, e.g., API call or local storage
    try {
      await saveFavorite(String(movie.id), !isFavorite);
      console.log("Favorite updated");
    } catch (error) {
      console.error("Error updating favorite", error);
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className={`flex items-center gap-2 ${
        isFavorite ? "text-red-500" : "text-gray-500"
      }`}
    >
      <Heart
        className={`h-5 w-5 ${isFavorite ? "fill-red-500" : "fill-none"}`}
      />
      <span className="text-lg font-semibold">
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </span>
    </button>
  );
};

export default AddToFavorites;
