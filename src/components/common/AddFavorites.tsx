import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Movie, Favorite } from "@/types";
import {
  saveFavorite,
  fetchFavorites,
  fetchUserProfile,
} from "@/services/favorites";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToFavorites = ({ movie }: { movie: Movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user) {
        setIsLoggedIn(false);
        return;
      }
      try {
        const favorites = await fetchUserProfile(user.id, 1); // Fetch user's favorites
        const isMovieFavorite = favorites.favorites.some((fav: Favorite) => {
          return fav.moviesId === movie.id;
        });
        setIsFavorite(isMovieFavorite); // Set the state based on whether the movie is a favorite
      } catch (error) {
        setIsError(true);
      }
    };

    checkIfFavorite();
  }, [movie.id]); // Re-run the effect if the movie changes

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error("You need to log in to add this movie to your favorites!", {
        progressStyle: { background: "orange" },
      });
      return;
    }

    setIsFavorite(!isFavorite);
    // Add logic to save favorite status, e.g., API call or local storage
    try {
      await saveFavorite(String(movie.id), !isFavorite, movie.title);
    } catch (error) {
      console.error("Error updating favorite", error);
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <>
      {/* {isError && <h1>There was a problem please try again</h1>} */}
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
    </>
  );
};

export default AddToFavorites;
