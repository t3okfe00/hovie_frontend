import apiClient from "./apiClient";

export const saveFavorite = async (movieId: string, isFavorite: boolean) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${BASE_URL}/favorites`;
  console.log("--- END POINT ---", endpoint);
  const method = isFavorite ? "POST" : "DELETE";

  return apiClient(endpoint, {
    method,
    body: JSON.stringify({ movieId }),
  });
};
