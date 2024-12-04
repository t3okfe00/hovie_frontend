import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileHeader } from "../components/ProfileHeader";
import { FavoritesList } from "../components/FavoritesList";
import Footer from "@/components/Footer";
import ReactPaginate from "react-paginate";
import { useAuth } from "@/hooks/useAuth";
import { fetchFavorites, deleteFavorite } from "@/services/favorites";
import { Favorite } from "@/types";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export function ProfilePage() {
  const { userId } = useParams();

  const [totalPages, setTotalPages] = useState<number>(1);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [favoriteError, setFavoriteError] = useState(false);

  const [page, setPage] = useState(1);

  const isOwner = !userId; // If no userId in URL, we're viewing our own profile
  const { user, isLoading } = useAuth();
  console.log("User at PROFILE PAGE:", user);

  useEffect(() => {
    const getFavorites = async () => {
      // Only fetch favorites if user is defined
      if (user) {
        try {
          setFavoritesLoading(true);
          const response = await fetchFavorites(page);
          const favoriteMovies: Favorite[] = response.favorites;

          setFavorites(favoriteMovies);
          setTotalPages(response.totalPages);
        } catch (error) {
          console.error("Failed to fetch favorites:", error);
          setFavoriteError(true);
          setFavorites([]);
        } finally {
          setFavoritesLoading(false);
        }
      }
    };

    getFavorites();
  }, [page, user]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Profile URL copied to clipboard!");
  };

  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected + 1);
  };

  const handleRemove = async (id: number) => {
    try {
      console.log("Removing favorite with id:", id);
      await deleteFavorite(id);
      setFavorites((prev) =>
        prev.filter((fav: Favorite) => fav.moviesId !== id)
      );
      console.log("Favorite removed successfully!");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="bg-gray-50">
      {user && <ProfileHeader user={user} isOwner={isOwner} />}

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {favoriteError && <h1>Error Loading favorites</h1>}
        {favoritesLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <FavoritesList
            favorites={favorites || []}
            isOwner={isOwner}
            onRemove={handleRemove}
            onShare={handleShare}
          />
        )}
      </div>
      {totalPages > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.min(totalPages, 300)}
          previousLabel="<"
          containerClassName="pagination flex justify-center space-x-4 my-8"
          pageClassName="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          activeClassName="bg-orange-500"
          disabledClassName="opacity-50 cursor-not-allowed"
          previousClassName="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          nextClassName="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        />
      )}
    </div>
  );
}
