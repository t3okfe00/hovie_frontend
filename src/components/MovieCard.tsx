import { Clock, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import type { Movie } from "../types/showtimetypes";

export default function MovieCard({
  id,
  title,
  image,
  duration,
  releaseDate,
  ageRating,
  genre,
  description,
}: Movie) {
  const formattedDate = new Date(releaseDate).toLocaleDateString('fi-FI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleBookTickets = () => {
    const bookingUrl = `https://www.finnkino.fi/event/${id}`;
    window.open(bookingUrl, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row gap-8 bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900/70 transition-all duration-300"
    >
      {/* Movie Poster */}
      <div className="relative w-full md:w-48 h-72 flex-shrink-0 group rounded-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Movie Details */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-white text-2xl font-bold">{title}</h3>
          <span className="px-3 py-1 bg-orange-500/20 text-orange-500 text-sm font-bold rounded-full">
            {ageRating}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={16} className="text-orange-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={16} className="text-orange-500" />
            <span>{formattedDate}</span>
          </div>
          {genre && (
            <div className="flex items-center gap-2 text-gray-400">
              <Tag size={16} className="text-orange-500" />
              <span>{genre}</span>
            </div>
          )}
        </div>

        <p className="text-gray-400 mt-4 flex-grow">{description}</p>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={handleBookTickets}
            className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors duration-200"
          >
            Book Tickets
          </button>
        </div>
      </div>
    </motion.div>
  );
}
