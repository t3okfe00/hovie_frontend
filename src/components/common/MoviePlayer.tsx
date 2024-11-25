import { useState } from "react";
import { YT } from "@types/youtube";
import YouTube from "react-youtube"; // Import the react-youtube component
import LoadingSpinner from "./LoadingSpinner";

const MovieVideo = ({
  videoKey,
  fullBackdropUrl,
  isLoadingVideos,
  isErrorVideos,
}: {
  videoKey: string;
  fullBackdropUrl: string;
  isLoadingVideos: boolean;
  isErrorVideos: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // YouTube Player options
  const opts = {
    height: "512",
    width: "910",
    playerVars: {
      autoplay: 1, // Start the video only when the user clicks play
      modestbranding: 1, // Hide the YouTube logo
      controls: 1, // Show player controls
    },
  };

  // Event handler when the video state changes
  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true); // Set state to 'playing' when the video starts playing
    }
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
      {isErrorVideos && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-lg text-red-500">
            There was an error loading the video...
          </h1>
        </div>
      )}
      {isLoadingVideos && <LoadingSpinner />}
      {/* Conditionally render the Play Button or the Video iframe */}

      {!isPlaying ? (
        <>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `url(${fullBackdropUrl})`, // YouTube thumbnail URL
            }}
          >
            <button
              onClick={() => setIsPlaying(true)} // Show video when play button is clicked
              className="h-12 w-12 rounded-full border-2 border-white bg-black/50 text-white transition-all hover:bg-black/70 sm:h-16 sm:w-16"
            >
              <span className="h-6 w-6 sm:h-8 sm:w-8">▶</span> {/* Play Icon */}
            </button>
          </div>
          {/* Thumbnail Image */}
          <img
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            alt="Movie Thumbnail"
            className="h-full w-full object-cover"
          />
        </>
      ) : (
        // YouTube Video embedded using react-youtube
        <YouTube
          videoId={videoKey} // Pass the video key (ID)
          opts={opts} // Pass player options
          onStateChange={onPlayerStateChange} // Listen for player state changes
        />
      )}
    </div>
  );
};

export default MovieVideo;
