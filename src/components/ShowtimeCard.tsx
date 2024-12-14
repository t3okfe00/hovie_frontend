import { MapPin, Clock, Subtitles, Users } from "lucide-react";
import { motion } from "framer-motion";

interface ShowtimeCardProps {
  time: string;
  endTime: string;
  theater: string;
  hall: string;
  language: string;
  subtitles: string;
  available: string;
  is2D: boolean;
  ageRating: string;
  title: string;
  poster: string;
  ticketUrl: string;
}

export default function ShowtimeCard({
  time,
  endTime,
  theater,
  hall,
  language,
  subtitles,
  available,
  is2D,
  ageRating,
  title,
  poster,
  ticketUrl,
}: ShowtimeCardProps) {
  const subtitleInfo =
    subtitles !== language ? `${language} | ${subtitles}` : language;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all duration-300"
    >
      <div className="flex items-center p-4 gap-4">
        {/* Movie Poster */}
        <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded-md shadow-md">
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Showtime Details */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>

          <div className="flex items-center text-sm text-gray-400 mb-2">
            <Clock size={14} className="text-orange-500 mr-1" />
            {time} - Ends at {endTime}
          </div>

          <div className="text-sm text-gray-400 flex items-center mb-2">
            <MapPin size={14} className="text-orange-500 mr-1" />
            {theater} - Hall {hall}
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <div className="flex items-center">
              <Subtitles size={12} className="text-orange-500 mr-1" />
              {subtitleInfo || "No Subtitles"}
            </div>
            <div className="flex items-center">
              <Users size={12} className="text-orange-500 mr-1" />
              {available}
            </div>
            {is2D && (
              <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full">
                2D
              </span>
            )}
            <span className="px-2 py-1 bg-orange-500/20 text-orange-500 text-xs font-bold rounded-full">
              {ageRating}
            </span>
          </div>
        </div>

        {/* Buy Tickets Button */}
        <div>
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-md hover:bg-orange-600 transition-colors duration-200"
          >
            Buy Tickets
          </a>
        </div>
      </div>
    </motion.div>
  );
}
