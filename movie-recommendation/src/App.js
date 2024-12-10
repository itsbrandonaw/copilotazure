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

  const omdbApiKey = 'c0a081d9'; // Replace with your OMDB API key
  const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=`;

  const darkColors = ['#2c3e50', '#34495e', '#1e2a34', '#2f3b44', '#212f36', '#3b4c57'];

  const handleMovieTitleChange = (e) => setMovieTitle(e.target.value);

  const handleRatingClick = (stars) => setRating(stars);

  const fetchMovieData = async (title) => {
    setLoading(true);
    try {
      const response = await axios.get(omdbUrl + title);
      if (response.data.Response === 'True') {
        return {
          title: response.data.Title,
          rating: response.data.imdbRating ? parseFloat(response.data.imdbRating) : 0,
          description: response.data.Plot,
          genres: response.data.Genre.split(', '),
          actors: response.data.Actors.split(', '),
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
      setLoading(false);
    }
  };

  const handleAddMovie = async () => {
    const movieData = await fetchMovieData(movieTitle);
    if (movieData) {
      setMovies([...movies, { ...movieData, userRating: rating }]);
      fetchRecommendations(movieData.genres, movieData.actors);
    }
    setIsModalOpen(false);
    setMovieTitle('');
    setRating(0);
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const fetchRecommendations = async (genres, actors) => {
    try {
      setLoading(true);
      const genreRecommendations = [];
      const actorRecommendations = [];

      for (let genre of genres) {
        const genreResponse = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${genre}&type=movie`);
        if (genreResponse.data.Search) {
          genreRecommendations.push(...genreResponse.data.Search);
        }
      }

      for (let actor of actors) {
        const actorResponse = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${actor}&type=movie`);
        if (actorResponse.data.Search) {
          actorRecommendations.push(...actorResponse.data.Search);
        }
      }

      const allRecommendations = [...genreRecommendations, ...actorRecommendations];
      const uniqueRecommendations = Array.from(new Set(allRecommendations.map((movie) => movie.Title)))
        .map((title) => allRecommendations.find((movie) => movie.Title === title));

      const enhancedRecommendations = await Promise.all(
        uniqueRecommendations.map(async (movie) => {
          const detailedResponse = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${movie.Title}`);
          return {
            ...movie,
            rating: detailedResponse.data.imdbRating || 'N/A',
            description: detailedResponse.data.Plot || 'No description available',
          };
        })
      );

      const sortedRecommendations = enhancedRecommendations.sort((a, b) => {
        const ratingA = parseFloat(a.rating) || 0;
        const ratingB = parseFloat(b.rating) || 0;
        return ratingB - ratingA;
      });

      const top10Recommendations = sortedRecommendations.slice(0, 10);
      setRecommendations(top10Recommendations);
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

        <div className="movies-list">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="movie-box"
              style={{ backgroundColor: darkColors[index % darkColors.length] }}
            >
              <h3>{movie.title}</h3>
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
              <p>IMDB Rating: {movie.rating}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="right-column">
        <h2>Recommended for You</h2>
        <div className="movies-list">
          {recommendations.map((movie, index) => (
            <div
              key={index}
              className="movie-box"
              style={{ backgroundColor: darkColors[index % darkColors.length] }}
            >
              <h3>{movie.Title}</h3>
              <p className="small-text">IMDB Rating: {movie.rating}</p>
              <p className="small-text">{movie.description}</p>
            </div>
          ))}
        </div>
      </div>

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
              <button onClick={handleAddMovie}>Add Movie</button>
              <button className="cancel-button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
