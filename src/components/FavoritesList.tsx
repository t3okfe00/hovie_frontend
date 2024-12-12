import { Heart, Share2, Trash2 } from "lucide-react";
import { Favorite } from "@/types";
import { Link } from "react-router-dom";
interface FavoritesListProps {
  favorites: Favorite[];
  isOwner: boolean | null;
  onRemove?: (id: number) => void;
  onShare?: () => void;
}

export function FavoritesList({
  favorites,
  isOwner,
  onRemove,
  onShare,
}: FavoritesListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Favorites</h2>
        {isOwner && (
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Share2 className="w-4 h-4" />
            Share List
          </button>
        )}
      </div>
      <div className="flex justify-center">
        {favorites.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg">
            <Heart className="w-12 h-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">
              No favorites yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isOwner
                ? "Start adding your favorite movies and TV shows!"
                : "This user hasn't added any favorites yet."}
            </p>
          </div>
        ) : (
          <ul className="space-y-4 w-1/2 bg-slate-200 p-4 rounded-lg shadow-md">
            {favorites.map((item) => (
              <li
                key={item.moviesId}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <Link to={`/movie/${item.moviesId}`} className="flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.movieName}
                    </h3>
                  </div>
                </Link>
                {isOwner && (
                  <button
                    onClick={() => onRemove?.(item.moviesId)}
                    className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
