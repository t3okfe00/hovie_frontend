import { useEffect, useState } from "react";

import ReviewForm from "./ReviewForm";
import { submitReview, fetchReviews, deleteReviews } from "@/services/reviews";
import { MoviesPagination } from "./MoviesPagination";
import { Review } from "@/types";

import ReviewsList from "./ReviewsList";
type ReviewsProps = {
  movieId: number;
};

const Reviews: React.FC<ReviewsProps> = ({ movieId }) => {
  const [page, setPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [reviews, setReviews] = useState<Review[]>([]); // Reviews state
  const [isReviewsLoading, setIsReviewsLoading] = useState(false); // Reviews loading state

  useEffect(() => {
    const getReviews = async () => {
      setIsReviewsLoading(true); // Set loading to true
      try {
        const data = await fetchReviews(String(movieId), page, 5); // Fetch reviews with pagination
        console.log("Fetching reviews for page", page);
        console.log("Reviews data", data);
        setReviews(data.reviews);
        setTotalPages(data.totalPages); // Set total pages
        setIsReviewsLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getReviews();
  }, [movieId, page]); // Re-fetch reviews when page or movieId changes

  const handleDeleteReview = async (reviewId: number) => {
    try {
      const deleted = await deleteReviews(reviewId); // Delete review
      console.log("DELETED", deleted);
      setReviews((prevReviews: Review[]) =>
        prevReviews.filter((review) => review.id !== reviewId)
      ); // Remove the review from the list
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  const onReviewSubmit = async (reviewData: {
    rating: number;
    comment: string;
  }) => {
    // Submit the review
    const { comment, rating } = reviewData;

    try {
      const data = await submitReview(movieId, comment, rating);
      console.log("CREATED REVUEW", data);
      const newReview = data.result[0];
      setReviews((prevReviews: Review[]) => {
        const updatedReviews = [newReview, ...prevReviews]; // Add the new review to the front
        return updatedReviews.slice(0, 3); // Ensure that only the latest 3 reviews are kept
      });
      console.log("NEDW REVIEW", newReview);

      console.log("Review submitted", data);
      setPage(1); // Reset page to 1
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1); // ReactPaginate uses 0-indexed pages, so we add 1
  };
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold sm:text-xl">Reviews</h2>

      {/* Reviews List */}
      <div className="space-y-4">
        {isReviewsLoading ? (
          <p>Loading reviews...</p>
        ) : (
          <ReviewsList
            reviews={reviews}
            handleDeleteReview={handleDeleteReview}
          ></ReviewsList>
        )}
      </div>

      {/* Pagination */}
      <MoviesPagination
        pageCount={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      <ReviewForm
        movieId={movieId}
        reviewsEndpoint="asd"
        onReviewSubmit={onReviewSubmit}
      ></ReviewForm>
    </div>
  );
};

export default Reviews;
