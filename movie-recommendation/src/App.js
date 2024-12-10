import React, { useState } from 'react';
import './App.css';

function App() {
  const [favoriteMovie, setFavoriteMovie] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const handleInputChange = (e) => {
    setFavoriteMovie(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple logic to provide movie recommendations
    // For now, we just simulate recommendations.
    const recommendations = [
      "Inception",
      "The Matrix",
      "Interstellar",
      "Blade Runner 2049",
      "The Dark Knight",
    ];

    // Filter recommendations based on the user's favorite movie
    if (favoriteMovie.toLowerCase() === "inception") {
      recommendations.push("Dunkirk");
    } else if (favoriteMovie.toLowerCase() === "matrix") {
      recommendations.push("John Wick");
    }

    // Update state to display the recommendations
    setRecommendedMovies(recommendations);
  };

  return (
    <div className="App">
      <h1>Personalized Movie Recommendation App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your favorite movie:
          <input
            type="text"
            value={favoriteMovie}
            onChange={handleInputChange}
            placeholder="Type a movie name"
          />
        </label>
        <button type="submit">Get Recommendations</button>
      </form>

      {recommendedMovies.length > 0 && (
        <div>
          <h3>Recommended Movies:</h3>
          <ul>
            {recommendedMovies.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
