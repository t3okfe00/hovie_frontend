import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while checking authentication
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // Render protected content if authenticated
};
