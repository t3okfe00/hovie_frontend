import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

import ReviewForm from "./ReviewForm";
import { submitReview } from "@/services/reviews";
import { fetchReviews } from "@/services/reviews";
import { MoviesPagination } from "./MoviesPagination";
import { Review } from "@/types";
type ReviewsProps = {
  movieId: number;
};

const Reviews: React.FC<ReviewsProps> = ({ movieId }) => {
  const [page, setPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [reviews, setReviews] = useState([]); // Reviews state

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews(String(movieId), page, 5); // Fetch reviews with pagination
        console.log("Fetching reviews for page", page);
        console.log("Reviews data", data);
        setReviews(data.reviews);
        setTotalPages(data.totalPages); // Set total pages
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getReviews();
  }, [movieId, page]); // Re-fetch reviews when page or movieId changes

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
      setReviews((prevReviews: Review) => [newReview, ...prevReviews]);
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
        {reviews?.map((review: Review) => (
          <Card key={review.id} className="border-0 bg-gray-900">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-800 sm:h-12 sm:w-12">
                  <img
                    src="/placeholder.svg"
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{review.username}</div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                    <span className="text-sm text-gray-400">
                      {review.rating}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-300 sm:text-base">
                {review.description}
              </p>
            </CardContent>
          </Card>
        ))}
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
