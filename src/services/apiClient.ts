import { toast } from "react-toastify";

const apiClient = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",

      ...(options.headers || {}),
    },
  });
  if (response.status === 204) {
    return;
  }
  const responseBody = await response.json(); // Parse response JSON

  if (!response.ok) {
    // Throw an error with the backend error message (if available)
    const error = new Error(
      responseBody.error || "Network response was not ok"
    );
    if (responseBody.error == "Unauthorized") {
      toast.error("You need to be signed in to leave a review!");
    }

    toast.error(responseBody.error);
    (error as any).status = response.status; // Attach HTTP status code
    throw error;
  }
  toast.success(responseBody.message);

  return responseBody;
};

export default apiClient;
