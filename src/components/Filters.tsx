import { Calendar as CalendarIcon, MapPin, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Theater } from '../types/showtimetypes';

interface FiltersProps {
  showTheaterFilter?: boolean;
  showDateFilter?: boolean;
  showGenreFilter?: boolean;
  showSortFilter?: boolean;
  selectedTheater: string;
  selectedDate: string;
  selectedGenre: string;
  selectedSort: string;
  theaters: Theater[];
  genres: string[];
  onTheaterChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function Filters({
  showTheaterFilter = true,
  showDateFilter = true,
  showGenreFilter = false,
  showSortFilter = false,
  selectedTheater,
  selectedDate,
  selectedGenre,
  selectedSort,
  theaters,
  genres,
  onTheaterChange,
  onDateChange,
  onGenreChange,
  onSortChange,
}: FiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center mb-12"
    >
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl px-4">
        {showTheaterFilter && (
          <div className="relative w-full sm:w-64">
            <MapPin
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500"
              size={20}
            />
            <select
              value={selectedTheater}
              onChange={(e) => onTheaterChange(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg pl-12 pr-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            >
              {theaters.map((theater) => (
                <option key={theater.id} value={theater.id}>
                  {theater.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {showDateFilter && (
          <div className="relative w-full sm:w-64">
            <CalendarIcon
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500"
              size={20}
            />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg pl-12 pr-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        )}

        {showGenreFilter && (
          <div className="relative w-full sm:w-64">
            <Filter
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500"
              size={20}
            />
            <select
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg pl-12 pr-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        )}

        {showSortFilter && (
          <div className="relative w-full sm:w-64">
            <Filter
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500"
              size={20}
            />
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg pl-12 pr-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="releaseDate">Release Date</option>
            </select>
          </div>
        )}
      </div>
    </motion.div>
  );
}