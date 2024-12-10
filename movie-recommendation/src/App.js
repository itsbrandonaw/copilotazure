import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [movieTitle, setMovieTitle] = useState('');
  const [rating, setRating] = useState(0); // Store the rating out of 5
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle movie title change
  const handleMovieTitleChange = (e) => {
    setMovieTitle(e.target.value);
  };

  // Handle rating click (set the number of stars)
  const handleRatingClick = (stars) => {
    setRating(stars);
  };

  // Handle adding movie
  const handleAddMovie = () => {
    // Here, you can add your movie and rating to the database
    alert(`Movie: ${movieTitle}, Rating: ${rating} stars`);
    setIsModalOpen(false); // Close modal after adding movie
  };

  // Open modal to add movie
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="left-column">
        <h1>MovieGPT</h1>
        <button className="add-movie-button" onClick={openModal}>+ Add Movie</button>
      </div>

      <div className="right-column">
        <h2>Recommended for You</h2>
        {/* Display recommendations here later */}
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
              <button onClick={handleAddMovie}>Add Movie</button>
              <button className="cancel-button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      <h1>MongoDB Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

    </div>
  );
}

export default App;
