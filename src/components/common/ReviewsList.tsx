import { Review } from "@/types";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
const ReviewsList = ({
  reviews,
  handleDeleteReview,
}: {
  reviews: Review[];
  handleDeleteReview: (id: number) => void;
}) => {
  const { user } = useAuth();
  return (
    <div>
      {reviews?.length === 0 && (
        <div className="text-gray-300 text-center">
          No reviews... Be first one to review this movie!
        </div>
      )}
      {reviews?.map((review: Review) => (
        <Card key={review.id} className="border-0 bg-gray-900 my-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-medium">{review.userName}</div>
                  <div className="text-sm text-gray-400">
                    {review.createdAt.slice(0, 10)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                    <span className="text-sm text-gray-400">
                      {review.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              {user?.id === review.usersId && (
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  <Trash className="h-5 w-5" />
                </button>
              )}
            </div>
            <p className="mt-4 text-sm text-gray-300 sm:text-base">
              {review.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewsList;
