import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MusicPage() {
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // User input
  const [searchTerm, setSearchTerm] = useState("lofi"); // Actual fetch trigger
  const [currentSong, setCurrentSong] = useState(null);

  // Load saved favorites
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Fetch songs when search term changes
  useEffect(() => {
    fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=10`)
      .then(res => res.json())
      .then(data => setSongs(data.results))
      .catch(err => console.error(err));
  }, [searchTerm]);

  const addToFavorites = (song) => {
    if (!favorites.find(f => f.trackId === song.trackId)) {
      const updated = [...favorites, song];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // prevent page reload
    if (searchInput.trim() !== "") {
      setSearchTerm(searchInput);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 py-10">
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-pink-700">BeatBox 🎵</h2>
        <Link to="/favorites" className="text-pink-700 hover:underline">My Favorites</Link>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="max-w-2xl mx-auto mb-10"
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by artist or genre..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-pink-700"
        />
      </form>

      <ul className="space-y-6 max-w-4xl mx-auto">
        {songs.map((song) => (
          <li
            key={song.trackId}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-900 rounded-xl p-4 shadow-md"
          >
            <div className="flex items-center gap-4">
              <img src={song.artworkUrl100} alt={song.trackName} className="w-16 h-16 rounded" />
              <div>
                <p className="text-lg font-semibold">{song.trackName}</p>
                <p className="text-sm text-gray-400">{song.artistName}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => playSong(song)}
                className="bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                ▶ Play
              </button>
              <button
                onClick={() => addToFavorites(song)}
                className="border border-pink-700 hover:bg-pink-700 text-pink-700 hover:text-white px-4 py-2 rounded-lg text-sm"
              >
                💖 Add
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Audio Player */}
      {currentSong && (
        <div className="mt-10 text-center">
          <p className="text-xl font-bold text-pink-700 mb-2">Now Playing:</p>
          <p className="mb-2">{currentSong.trackName} by {currentSong.artistName}</p>
          <audio
            controls
            autoPlay
            src={currentSong.previewUrl}
            className="w-full max-w-md mx-auto"
          />
        </div>
      )}
    </div>
  );
}

export default MusicPage;
