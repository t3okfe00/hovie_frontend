import { Film } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center">
      <div className="relative">
        <Film className="w-16 h-16 text-orange-500 animate-pulse" />
        <div className="absolute inset-0 animate-spin [animation-duration:3s]">
          <div className="h-full w-full rounded-full border-t-2 border-orange-500/30"></div>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <div className="text-orange-500 font-semibold text-xl mb-2">
          Loading
        </div>
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
