import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [movieTitle, setMovieTitle] = useState('');
  const [rating, setRating] = useState(0); // Store the rating out of 5
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]); // Store the list of movies
  const [loading, setLoading] = useState(false); // Loading state
  const [recommendations, setRecommendations] = useState([]); // Store the recommended movies

  // Define OMDB API URL and your API Key
  const omdbApiKey = 'c0a081d9'; // Replace with your OMDB API key
  const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=`;

  // Define an array of dark colors to use for movie boxes
  const darkColors = ['#2c3e50', '#34495e', '#1e2a34', '#2f3b44', '#212f36', '#3b4c57'];

  // Handle movie title change
  const handleMovieTitleChange = (e) => {
    setMovieTitle(e.target.value);
  };

  // Handle rating click (set the number of stars)
  const handleRatingClick = (stars) => {
    setRating(stars);
  };

  // Fetch movie data from OMDB
  const fetchMovieData = async (title) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(omdbUrl + title);
      if (response.data.Response === 'True') {
        // Use the exact title returned by OMDB
        return {
          title: response.data.Title,  // Get the exact title
          rating: response.data.imdbRating ? parseFloat(response.data.imdbRating) : 0,
          description: response.plot,
          genres: response.data.Genre.split(', '),  // Extract genres
          actors: response.data.Actors.split(', ')  // Extract actors
        };
      } else {
        alert('Movie not found!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching movie data', error);
      alert('Failed to fetch movie data.');
      return null;
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle adding movie
  const handleAddMovie = async () => {
    const movieData = await fetchMovieData(movieTitle);
    if (movieData) {
      setMovies([...movies, { ...movieData, userRating: rating }]); // Add the new movie with the user rating
      fetchRecommendations(movieData.genres, movieData.actors);  // Fetch recommendations based on genres and actors
    }
    setIsModalOpen(false); // Close modal after adding movie
    setMovieTitle(''); // Reset the title input
    setRating(0); // Reset the rating
  };

  // Open modal to add movie
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch movie recommendations based on genres and actors
  // Fetch movie recommendations based on genres and actors
  const fetchRecommendations = async (genres, actors) => {
    try {
      setLoading(true);
      const genreRecommendations = [];
      const actorRecommendations = [];
  
      // Fetch movie recommendations based on genres
      for (let genre of genres) {
        const genreResponse = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${genre}&type=movie`);
        if (genreResponse.data.Search) {
          genreRecommendations.push(...genreResponse.data.Search);
        }
      }
  
      // Fetch movie recommendations based on actors
      for (let actor of actors) {
        const actorResponse = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${actor}&type=movie`);
        if (actorResponse.data.Search) {
          actorRecommendations.push(...actorResponse.data.Search);
        }
      }
  
      // Merge and remove duplicates
      const allRecommendations = [...genreRecommendations, ...actorRecommendations];
      const uniqueRecommendations = Array.from(new Set(allRecommendations.map((movie) => movie.Title)))
        .map((title) => allRecommendations.find((movie) => movie.Title === title));
  
      // Fetch detailed information for each movie
      const enhancedRecommendations = await Promise.all(
        uniqueRecommendations.map(async (movie) => {
          const detailedResponse = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${movie.Title}`);
          return {
            ...movie,
            rating: detailedResponse.data.imdbRating || 'N/A',  // Add IMDb rating
            description: detailedResponse.data.Plot || 'No description available'  // Add description
          };
        })
      );
  
      // Sort by IMDb rating in descending order
      const sortedRecommendations = enhancedRecommendations.sort((a, b) => {
        const ratingA = parseFloat(a.rating) || 0;
        const ratingB = parseFloat(b.rating) || 0;
        return ratingB - ratingA;  // Sort from highest to lowest rating
      });
  
      // Take top 10 recommendations
      const top10Recommendations = sortedRecommendations.slice(0, 10);
  
      setRecommendations(top10Recommendations);  // Update the state with top 10 recommendations
    } catch (error) {
      console.error('Error fetching recommendations', error);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="App">
      <div className="left-column">
        <h1>MovieGPT</h1>
        <button className="add-movie-button" onClick={openModal}>+ Add Movie</button>
        
        {/* Display added movies */}
        <div className="movies-list">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="movie-box"
              style={{ backgroundColor: darkColors[index % darkColors.length] }} // Cycle through dark colors
            >
              <h3>{movie.title}</h3>  {/* This will now show the exact title from OMDB */}
              <div className="stars-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${movie.userRating >= star ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>IMDB Rating: {movie.rating}</p> {/* Display IMDB rating fetched from OMDB */}
            </div>
          ))}
        </div>
      </div>

      <div className="right-column">
        <h2>Recommended for You</h2>
        {/* Display movie recommendations */}
        <div className="movies-list">
          {recommendations.map((movie, index) => (
            <div
              key={index}
              className="movie-box"
              style={{ backgroundColor: darkColors[index % darkColors.length] }}
            >
              <h3>{movie.Title}</h3> {/* Show recommended movie title */}
              <p className="small-text">IMDB Rating: {movie.rating}</p>
              <p className="small-text">{movie.description}</p> {/* Display movie description here */}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add a Watched Movie</h3>
            <label>Movie Title:</label>
            <input
              type="text"
              placeholder="Enter movie title"
              value={movieTitle}
              onChange={handleMovieTitleChange}
            />
            <label>Rating:</label>
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? 'filled' : ''}`}
                  onClick={() => handleRatingClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="buttons-container">
              <button onClick={handleAddMovie} disabled={loading}>Add Movie</button>
              <button className="cancel-button" onClick={closeModal}>Cancel</button>
            </div>
            {loading && <p>Loading...</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
