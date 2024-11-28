// import React from 'react';
// import type { User } from '../types';

// interface ProfileHeaderProps {
//   user: User;
//   isOwner: boolean;
// }

// export function ProfileHeader({ user, isOwner }: ProfileHeaderProps) {
//   return (
//     <div className="relative">
//       <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600" />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
//           <div className="flex">
//             <img
//               className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
//               src={user.avatar || '/default-avatar.png'}
//               alt={user.name || 'User Avatar'}
//             />
//           </div>
//           <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
//             <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
//               <h1 className="text-2xl font-bold text-gray-900 truncate">
//                 {user.name}'s Collection
//               </h1>
//               <p className="text-sm text-gray-500">
//                 {user.favorites.length} {user.favorites.length === 1 ? 'favorite' : 'favorites'}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import type { User } from '../types';

interface ProfileHeaderProps {
  user: User;
  isOwner: boolean;
}

export function ProfileHeader({ user, isOwner }: ProfileHeaderProps) {
  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={user.avatar || '/default-avatar.png'}
              alt={user.name || 'User Avatar'}
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {user.name}'s Collection
              </h1>
              <p className="text-sm text-gray-500">
                {user.favorites.length} {user.favorites.length === 1 ? 'favorite' : 'favorites'}
              </p>
            </div>

            {/* Conditionally render the Edit Profile button */}
            {isOwner && (
              <button
                className="mt-4 inline-block rounded-md bg-orange-500 text-white px-4 py-2 text-sm font-semibold hover:bg-orange-600"
                onClick={() => alert('Edit Profile clicked!')} // Replace with actual edit functionality
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
