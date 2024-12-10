import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [favoriteMovie, setFavoriteMovie] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  // Place data into MongoDB(?)
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  // Handle user input for favorite movie
  const handleInputChange = (e) => {
    setFavoriteMovie(e.target.value);
  };

  // Handle form submission to get movie recommendations
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!favoriteMovie) {
      setError("Please enter a movie name.");
      return;
    }

    setError(""); // Clear previous error message

    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${favoriteMovie}&apikey=c0a081d9`);
      const data = await response.json();

      if (data.Response === 'True') {
        setRecommendedMovies(data.Search); // Display movie results
      } else {
        setRecommendedMovies([]); // No results found
        setError("No movies found for your search.");
      }
    } catch (error) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error(error);
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

      {error && <p className="error">{error}</p>}

      {recommendedMovies.length > 0 && (
        <div>
          <h3>Recommended Movies:</h3>
          <ul>
            {recommendedMovies.map((movie, index) => (
              <li key={index}>
                <strong>{movie.Title}</strong> ({movie.Year})
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <h1>MongoDB Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

    </div>
  );
}

export default App;
