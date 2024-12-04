import apiClient from "./apiClient";

export const fetchReviews = async (movieId: string, page: number) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${BASE_URL}/reviews/${movieId}?page=${page}`;
  const method = "GET";
  return apiClient(endpoint, { method });
};

export const submitReview = async (
  movieId: number,
  comment: string,
  rating: number
) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${BASE_URL}/reviews/${movieId}`;
  const method = "POST";
  return apiClient(endpoint, {
    method,
    body: JSON.stringify({ comment, rating }),
  });
};
