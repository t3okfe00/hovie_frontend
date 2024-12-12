import apiClient from "./apiClient";

export const saveFavorite = async (
  movieId: string,
  isFavorite: boolean,
  movieName: string
) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${BASE_URL}/favorites`;

  const method = isFavorite ? "POST" : "DELETE";

  return apiClient(endpoint, {
    method,
    body: JSON.stringify({ movieId, movieName }),
  });
};

export const deleteFavorite = async (movieId: number) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${BASE_URL}/favorites`;

  const method = "DELETE";

  return apiClient(endpoint, {
    method,
    body: JSON.stringify({ movieId }),
  });
};

export const fetchFavorites = async (page: number) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${BASE_URL}/favorites?limit=5&page=${page}`;
  const method = "GET";

  return apiClient(endpoint, { method });
};

// In services/favorites.ts
export const fetchUserProfile = async (userId: number, page: number) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${BASE_URL}/favorites/shared/${userId}`;
  const method = "GET";

  return apiClient(endpoint, { method });
};

// export const fetchFavorites = async (page: number, userId?: number) => {
//   const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
//   let endpoint = `${BASE_URL}/favorites?limit=5&page=${page}`;

//   const method = "GET";

//   return apiClient(endpoint, { method });
// };
