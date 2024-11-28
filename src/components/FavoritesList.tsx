import React from 'react';
import { Heart, Share2, Trash2 } from 'lucide-react';
import type { Movie } from '../types/types';

interface FavoritesListProps {
  favorites: Movie[];
  isOwner: boolean;
  onRemove?: (id: string) => void;
  onShare?: () => void;
}

export function FavoritesList({ favorites, isOwner, onRemove, onShare }: FavoritesListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Favorites</h2>
        {isOwner && (
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-orange-500 text-white bg-indigo-600 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Share2 className="w-4 h-4" />
            Share List
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((item) => (
          <div key={item.id} className="relative group">
            <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[2/3]">
              <img
                src={item.posterUrl}
                alt={item.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 text-xs font-medium text-white bg-indigo-600 rounded-full">
                    {item.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-300">{item.year}</span>
                </div>
              </div>
            </div>
            
            {isOwner && (
              <button
                onClick={() => onRemove?.(item.id)}
                className="absolute top-2 right-2 p-2 text-white bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        
        {favorites.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg">
            <Heart className="w-12 h-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No favorites yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              {isOwner 
                ? "Start adding your favorite movies and TV shows!"
                : "This user hasn't added any favorites yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}