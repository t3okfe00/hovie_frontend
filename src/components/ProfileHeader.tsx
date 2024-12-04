import type { User } from "../types";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

interface ProfileHeaderProps {
  user: User | null;
  isOwner: boolean;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  console.log("User in PROFILE HEADER", user);
  const { deleteAcc } = useAuth();

  const handleDeleteAccount = async () => {
    console.log("Delete Account Request-");
    try {
      await deleteAcc();
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };
  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate mt-16">
                {user?.name || "User!"}'s Collection
              </h1>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
