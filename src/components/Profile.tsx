// src/components/Profile.js
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch user's favorite movies/TV shows
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(response.data);
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>
      <div>
        {favorites.map((item) => (
          <div key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
            />
            <h3>{item.title || item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
