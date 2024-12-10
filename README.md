# MovieGPT

MovieGPT is a web application that allows users to create a personalized almanac of movies they've watched. Users can add movies, rate them on a scale of 1 to 5 stars, and view their personal ratings alongside official IMDb ratings. Powered by the OMDb API, the app fetches movie details like IMDb ratings, genres, actors, and posters, creating an engaging way to track your movie-watching journey. Additionally, CopilotAzure recommends new movies based on your preferences.

## Features
- **Add Movies**: Search for movies by title and add them to your personal list.
- **Rate Movies**: Rate each movie on a scale of 1 to 5 stars to reflect your personal opinion.
- **IMDb Rating Display**: Automatically fetch and display the IMDb rating for each movie added.
- **Movie Recommendations**: Get movie recommendations based on your added movies’ genres and actors.
- **Interactive UI**: View movie details, including posters, in an appealing and user-friendly layout.
- **Dark Mode Styling**: Toggle between light and dark modes for a customizable UI experience.

## Technologies Used
- **Frontend**: React.js
- **API Integration**: OMDb API for fetching movie details
- **Cloud Deployment**: Azure

## How It Works

1. **Add a Movie**:
    - Enter a movie title in the input field and submit.
    - The app fetches movie details (e.g., title, IMDb rating, and poster) from the OMDb API.
    
2. **Rate the Movie**:
    - Use a star-based rating system to give your personal rating from 1 to 5 stars.
    
3. **View Your Almanac**:
    - See a list of all the movies you've added, complete with your rating, IMDb rating, and poster.

4. **Get Recommendations**:
    - Based on the genres and actors of the movies you've added, receive personalized movie recommendations.
    - Recommendations can be sorted by IMDb rating for easier discovery of top-rated films.

## Future Enhancements
- **User Authentication**: Enable multiple users to maintain separate movie lists.
- **Sorting and Filtering**: Implement features to sort or filter movies by rating, genre, year, etc.
- **Sharing Options**: Allow users to share their movie lists with friends.
- **Cloud Storage**: Enable syncing across devices to access your movie list anywhere.
- **Improved Recommendations**: Enhance movie recommendations with more advanced algorithms and user preferences.

## Setup and Installation

### Prerequisites
Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node package manager)

### Steps to run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/copilotazure.git
    ```

2. Navigate into the project directory:
    ```bash
    cd copilotazure
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

    This will open the application in your browser at `http://localhost:3000`.

### Setting up OMDb API
To fetch movie data from the OMDb API, you need an API key.

1. Go to [OMDb API](http://www.omdbapi.com/) and sign up for an API key.
2. Replace the placeholder in the `App.js` file with your API key:
    ```js
    const omdbApiKey = 'your_api_key_here'; // Replace with your OMDb API key
    ```

## Azure Deployment

1. Deploy your app on Azure by creating an **App Service** in the Azure portal.
2. Configure the App Service to deploy from your GitHub repository or use local Git deployment.
3. Ensure your environment variables (like the OMDb API key) are correctly set in the Azure settings.
4. Once deployed, your app will be available at the Azure URL.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [OMDb API](http://www.omdbapi.com/) for providing movie data.
- [React](https://reactjs.org/) for the frontend framework.
- [Axios](https://axios-http.com/) for making API requests.
- [Azure](https://azure.microsoft.com/) for hosting the application.
