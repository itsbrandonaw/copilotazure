**MovieGPT**

MovieGPT is a web application that allows users to create a personal almanac of movies they've watched. Users can add movies, rate them on a scale of 1 to 5 stars, and view their ratings alongside official IMDb ratings. MovieGPT utilizes the OMDb API to fetch movie details, including IMDb ratings and posters, making it an engaging way to track your movie-watching journey.

**Features**

Add Movies: Search for movies by title and add them to your personal list.
Rate Movies: Rank each movie on a scale of 1 to 5 stars to reflect your personal rating.
Display IMDb Rating: Automatically fetch and display the IMDb rating for each added movie.
Persistent Storage: Your movie list is saved directly on the page for easy access.
Interactive UI: View movie details, including posters, in a visually appealing layout.

**Tech Stack**

Frontend: React.js
API Integration: OMDb API for fetching movie details.

**How It Works**

Add a Movie:
- Enter a movie title in the input field and submit.
- The app fetches movie details (e.g., title, IMDb rating, and poster) from the OMDb API.
Rate the Movie:
- Use a star-based rating system to give your personal rating.
View Your Almanac:
- See a list of all the movies you've added, complete with your rating, IMDb rating, and poster.

**Future Enhancements**

Add user authentication to allow multiple users to maintain separate movie lists.
Implement sorting and filtering features (e.g., sort by rating, genre, or year).
Introduce sharing options for users to share their movie lists.
Enable cloud storage to make the movie list accessible across devices.
