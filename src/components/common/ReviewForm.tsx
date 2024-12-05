import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ReviewFormProps = {
  movieId: number;
  reviewsEndpoint: string;
  onReviewSubmit: (review: { rating: number; comment: string }) => void;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0 || !comment.trim()) return;

    onReviewSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg"
    >
      {/* Star Rating Section */}
      <div className="flex items-center justify-center space-x-1">
        <span className="text-sm text-gray-400">Your Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`
              text-2xl transition-transform transform duration-200 
              ${rating >= star ? "text-orange-500 scale-125" : "text-gray-500"}
            `}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Review Input */}
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Your Review:
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full min-h-[100px] text-sm rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:ring focus:ring-orange-500 focus:outline-none"
          maxLength={200}
        />
        <div className="mt-1 text-xs text-gray-500">
          {200 - comment.length} characters remaining
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          disabled={rating === 0 || !comment.trim()}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md disabled:opacity-50"
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
