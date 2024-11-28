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

export const fetchFavorites = async () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${BASE_URL}/favorites`;
  const method = "GET";

  return apiClient(endpoint, { method });
};
