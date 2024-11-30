import type { User } from "../types";

interface ProfileHeaderProps {
  user: User | null;
  isOwner: boolean;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate mt-16">
                {user?.name.toUpperCase()}'s Collection
              </h1>
              {/* <p className="text-sm text-gray-500">
                {user.favorites.length}{" "}
                {user.favorites.length === 1 ? "favorite" : "favorites"}
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
