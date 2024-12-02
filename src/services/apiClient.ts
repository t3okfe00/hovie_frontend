const apiClient = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",

      ...(options.headers || {}),
    },
  });
  const responseBody = await response.json(); // Parse response JSON

  if (!response.ok) {
    // Throw an error with the backend error message (if available)
    const error = new Error(
      responseBody.error || "Network response was not ok"
    );
    console.log("**** RES BODY ****", responseBody);
    (error as any).status = response.status; // Attach HTTP status code
    throw error;
  }

  return responseBody;
};

export default apiClient;
