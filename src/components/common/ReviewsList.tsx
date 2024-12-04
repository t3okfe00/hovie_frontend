import { Review } from "@/types";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      {reviews?.length === 0 && (
        <div className="text-gray-300 text-center">
          No reviews... Be first one to review this movie!
        </div>
      )}
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
                <div className="font-medium">{review.userName}</div>

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                  <span className="text-sm text-gray-400">{review.rating}</span>
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
  );
};

export default ReviewsList;
