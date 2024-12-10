const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const axios = require('axios');
const path = require('path');

const app = express();

// Your OMDb API key
const OMDB_API_KEY = 'c0a081d9';
const OMDB_API_URL = 'http://www.omdbapi.com/';

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Function to fetch movie data from OMDb API
async function fetchMovieData(title) {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        t: title, // Movie title (example: "The Lion King")
        apikey: OMDB_API_KEY,
      },
    });

    if (response.data.Response === 'True') {
      return response.data;
    } else {
      throw new Error('Movie not found');
    }
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return null;
  }
}

// API route to get movie data
app.get('/api/movie/:title', async (req, res) => {
  const title = req.params.title;
  const movieData = await fetchMovieData(title);
  if (movieData) {
    res.json(movieData); // Send movie data to the frontend
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Example of serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

dotenv.config(); // Load environment variables from a .env file
const portback = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(portback, () => {
  console.log(`Server running on port ${portback}`);
});