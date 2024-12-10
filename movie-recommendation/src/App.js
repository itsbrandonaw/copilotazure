import React, { useState } from 'react';
import './App.css';

function App() {
  const [favoriteMovie, setFavoriteMovie] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  // Handle user input for favorite movie
  const handleInputChange = (e) => {
    setFavoriteMovie(e.target.value);
  };

  // Handle form submission to generate movie recommendations
  const handleSubmit = (e) => {
    e.preventDefault();

    // A simple recommendation system (you can later integrate a real one)
    const recommendations = {
      "inception": ["Interstellar", "The Dark Knight", "Dunkirk", "Memento"],
      "matrix": ["John Wick", "Inception", "Blade Runner 2049", "Minority Report"],
      "batman": ["The Dark Knight", "Joker", "Watchmen", "The Prestige"],
      "avengers": ["Iron Man", "Thor", "Spider-Man: Homecoming", "Black Panther"]
    };

    // Look for recommendations based on favorite movie
    const movieKey = favoriteMovie.toLowerCase();
    if (recommendations[movieKey]) {
      setRecommendedMovies(recommendations[movieKey]);
    } else {
      setRecommendedMovies(["Sorry, no recommendations found for your movie"]);
    }
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
