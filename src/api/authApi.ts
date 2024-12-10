import { User } from "@/types";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Function to sign up a new user
export const signUp = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  console.log("Signup Request-");
  const response = await fetch(`${BACKEND_API_URL}/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Signup failed");
  }
  const responseData = await response.json();
  console.log("Response after USER CREATED", responseData);
  return responseData;
};

// Function to log in a user
export const login = async (data: { email: string; password: string }) => {
  console.log("Login Request-");
  const response = await fetch(`${BACKEND_API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // Ensures cookies (e.g., JWT) are sent/received
  });

  const responseData = await response.json();
  if (!response.ok) {
    // If response is not OK, throw a detailed error
    throw new Error(
      responseData?.message || responseData?.error || "Login failed."
    );
  }

  console.log("Response Data from LOGIN API", responseData);
  return responseData;
};

export const logout = async () => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/user/logout`, {
      method: "POST",
      credentials: "include", // Ensure cookies are sent
    });

    if (response.ok) {
      console.log("Logout successful");

      return { success: true, message: "Logout successful" };
      // Redirect to login or homepage
    } else {
      console.error("Failed to logout");
      return { success: false, message: "Failed to logout" };
    }
  } catch (error) {
    console.error("Error logging out", error);
    window.location.href = "/login"; // Or use react-router to navigate

    return { success: false, message: "Error logging out" };
  }
};

export const deleteAccount = async () => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/user/delete`, {
      method: "DELETE",
      credentials: "include", // Ensure cookies are sent
    });

    if (response.ok) {
      console.log("Account deleted successfully");

      return { success: true, message: "Account deleted successfully" };
      // Redirect to login or homepage
      // window.location.href = "/login"; // Or use react-router to navigate
    } else {
      console.error("Failed to delete account");
      return { success: false, message: "Failed to delete account" };
    }
  } catch (error) {
    console.error("Error deleting account", error);
    return { success: false, message: "Error deleting account" };
  }
};
