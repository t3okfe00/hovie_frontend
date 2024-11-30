import { AuthContextType, User } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"; // Import the query client hook

import {
  login as loginApi,
  signUp as signUpApi,
  logout as logOut,
} from "@/api/authApi";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Use queryClient to invalidate the cache

  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user on useEffect");
      try {
        const response = await fetch(`${BACKEND_API_URL}/user/me`, {
          credentials: "include",
        }); // Ensure cookies are sent
        console.log("Response from fetchUser", response);
        if (response.ok) {
          const data = await response.json();
          console.log("Data from fetchUser", data);
          setUser(data.user);
        } else {
          setUser(null); // Handle unauthorized user
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const response = await loginApi(data);
    console.log("Response after login", response);

    setUser(response.user);
    setToken(response.token);
  };

  const signUp = async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> => {
    const newUser = await signUpApi(data);
    // setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    try {
      const response = await logOut();

      if (response.success) {
        console.log("Logout successful");
        setUser(null);
        setToken(null);
        queryClient.clear(); // This clears the React Query cache
        navigate("/login");
      } else {
        console.error("Logout failed:", response.message); // Handle logout failure
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, signUp, isLoading, isError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
