// src/FavoritesPage.js
import React, { useEffect, useState } from 'react';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(song => song.trackId !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 py-10">
      <h2 className="text-4xl font-bold text-pink-700 mb-8 text-center">My Favorite Tracks 💖</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-400">You haven’t added any songs yet.</p>
      ) : (
        <ul className="space-y-4 max-w-4xl mx-auto">
          {favorites.map((song) => (
            <li key={song.trackId} className="flex justify-between items-center bg-gray-900 p-4 rounded-lg">
              <div>
                <p className="font-semibold">{song.trackName}</p>
                <p className="text-sm text-gray-400">{song.artistName}</p>
              </div>
              <button
                onClick={() => removeFavorite(song.trackId)}
                className="text-sm text-white bg-pink-700 hover:bg-pink-600 px-3 py-1 rounded"
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
