// // ProfilePage.tsx
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { ProfileHeader } from '../components/ProfileHeader';
// import { FavoritesList } from '../components/FavoritesList';

// // Mock data for demonstration - replace with actual data fetching
// const mockUser = {
//   id: '1',
//   name: 'John Doe',
//   avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   favorites: [
//     {
//       id: '1',
//       title: 'Inception',
//       type: 'movie',
//       posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
//       year: 2010
//     },
//     {
//       id: '2',
//       title: 'Breaking Bad',
//       type: 'tv',
//       posterUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
//       year: 2008
//     }
//   ]
// };

// export function ProfilePage() {
//   const { userId } = useParams();
//   const isOwner = !userId; // If no userId in URL, we're viewing our own profile

//   const handleShare = () => {
//     const url = window.location.href;
//     navigator.clipboard.writeText(url);
//     alert('Profile URL copied to clipboard!');
//   };

//   const handleRemove = (id: string) => {
//     // In a real app, this would make an API call to remove the favorite
//     console.log('Removing favorite:', id);
//   };

//   const user = isOwner ? mockUser : { ...mockUser, name: 'Another User' }; // Example of modifying for another user

//   return (
//     <div className="bg-gray-50">
//       <ProfileHeader user={user} isOwner={isOwner} />
//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <FavoritesList
//           favorites={user.favorites || []}
//           isOwner={isOwner}
//           onRemove={handleRemove}
//           onShare={handleShare}
//         />
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileHeader } from '../components/ProfileHeader';
import { FavoritesList } from '../components/FavoritesList';
import Footer from '@/components/Footer';
import ReactPaginate from 'react-paginate';

// Mock data for demonstration - replace with actual data fetching
const mockUser = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  favorites: [
    {
      id: '1',
      title: 'Inception',
      type: 'movie',
      posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      year: 2010
    },
    {
      id: '2',
      title: 'Breaking Bad',
      type: 'tv',
      posterUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      year: 2008
    }
  ]
};

export function ProfilePage() {
  const { userId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState(mockUser.favorites);
  
  const isOwner = !userId; // If no userId in URL, we're viewing our own profile

  useEffect(() => {
    // Check if user is logged in by looking for a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
    
    // Optionally, fetch user's favorites from an API if logged in
    // if (isLoggedIn) {
    //   // Fetch logic to retrieve user's favorite items, e.g., axios call.
    // }
  }, []);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Profile URL copied to clipboard!');
  };

  const handleRemove = (id: string) => {
    // In a real app, this would make an API call to remove the favorite
    console.log('Removing favorite:', id);
  };

  const user = isOwner ? mockUser : { ...mockUser, name: 'Another User' }; // Example of modifying for another user

  // const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_KEY = 'fcefb9fb4e1f1f86914fa824bf441e7a';
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";


  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [showingMovies, setShowingMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loadingPopular, setLoadingPopular] = useState<boolean>(true);
  const [loadingNowShowing, setLoadingNowShowing] = useState<boolean>(true);

  const fetchMovies = async (endpoint: string, page: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${endpoint}?api_key=${API_KEY}&page=${page}&append_to_response=genres`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setTotalPages(data.total_pages);

      const moviesWithDetails = await Promise.all(
        data.results.map(async (movie: any) => {
          const detailsResponse = await fetch(
            `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`
          );
          const details = await detailsResponse.json();
          
          return {
            id: movie.id,
            title: movie.title,
            images: [
              `${IMAGE_BASE_URL}${movie.backdrop_path}`,
              `${IMAGE_BASE_URL}${movie.poster_path}`
            ].filter(Boolean),
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            genres: details.genres?.map((g: { name: string }) => g.name) || []
          };
        })
      );
      return moviesWithDetails;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  const loadMovies = async () => {
    setLoadingPopular(true);
    const popular = await fetchMovies("movie/popular", currentPage);
    setPopularMovies(popular);
    setLoadingPopular(false);

    setLoadingNowShowing(true);
    const showing = await fetchMovies("movie/now_playing", 1);
    setShowingMovies(showing);
    setLoadingNowShowing(false);
  };

  useEffect(() => {
    loadMovies();
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };


  return (
    <div className="bg-gray-50">
      <ProfileHeader user={user} isOwner={isOwner} />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <FavoritesList
          favorites={user.favorites || []}
          isOwner={isOwner}
          onRemove={handleRemove}
          onShare={handleShare}
        />

        {/* Only show "Edit Profile" and "Share List" buttons if the user is logged in and viewing their own profile */}
        {isLoggedIn && isOwner && (
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-orange-600 text-white rounded"
              onClick={() => alert('Edit Profile button clicked!')} // Implement edit profile logic here
            >
              Edit Profile
            </button>
            <button
              className="ml-4 px-4 py-2 bg-orange-500 text-white rounded"
              onClick={handleShare}
            >
              Share List
            </button>
          </div>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.min(totalPages, 300)}
        previousLabel="<"
        containerClassName="pagination flex justify-center space-x-4 my-8"
        pageClassName="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        activeClassName="bg-orange-500"
        disabledClassName="opacity-50 cursor-not-allowed"
        previousClassName="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        nextClassName="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
      />
      <Footer />
    </div>
  );
}
