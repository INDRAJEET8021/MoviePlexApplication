# MoviePlexApplication

MoviePlex is a **full-stack** application that allows users to search for movies, manage their favorites, and view detailed information about movies. Built with **React** for the frontend and **Node.js** for the backend, the application fetches movie data from the OMDB API.

### Features:
- **Search for movies**: Find movies by title.
- **View detailed movie information**: Including release date, cast, plot, runtime, rating, etc.
- **Manage favorites**: Logged-in users can add or remove movies from their favorites list.
- **Responsive design**: Works seamlessly across devices (desktop, tablet, mobile).

---

## Setup Instructions

### 1. Clone the repository
To get started with the project, first clone the repository to your local machine:

```bash
git clone https://github.com/INDRAJEET8021/MoviePlexApplication.git
```

### 2. Install Dependencies
The project consists of both frontend (React) and backend (Node.js). You need to install dependencies for both parts of the application.

```bash
npm install
```

For the backend, navigate to the backend directory and run:

```bash
cd backend
npm install
```

### 3. Set up Environment Variables
You will need to configure environment variables for both the frontend and backend.

#### Frontend (.env)
Create a .env file in the frontend directory and add your OMDB API key:

```
REACT_APP_OMDB_API_KEY=your_omdb_api_key
```

#### Backend (.env)
Create a .env file in the backend directory and add your OMDB API key along with your database and JWT secrets:

```
PORT=your_port
HOST='host_name'
DATABASE='your_database_name'
USER='database_user'
DB_PASSWORD='database_password'
DB_PORT='database_port'
ssc_cert_path='your_ssc_cert_path'  # cloud database
JWT_SECRET='add_jwt_secret_key'
```

### 4. Start the Project
For the frontend, run the following command in the frontend directory:
```
npm run start
```
For the backend, run the following command in the backend 
```
dd backend
npm run dev
```
## API Documentation
### 1. OMDB API Integration
The MoviePlex application integrates with the OMDB API to fetch detailed movie information like titles, ratings, release dates, cast, etc.
```
Base URL: https://www.omdbapi.com/
```

#### 1.1.  GET Search for movies by title.


**Endpoint**: `/`  
**Method**: `GET`  

**Query Parameters**:
- `title1`: The title of the movie to search for.
- `apikey`: Your OMDB API Key (required)

**Example Request**:

```http
GET /movies/search?title=Inception

```

#### 1.2  Get detailed information about a specific movie.

**Endpoint**: `/movies/:imdbID`  
**Method**: `GET`  

**Query Parameters**:
- `i`: IMDB ID of the movie (required)
- `apikey`: Your OMDB API Key (required)

Request:
URL: /movies/:imdbID
Method: GET
Params:
imdbID: The IMDb ID of the movie.

**Example Request**:

```http
GET https://www.omdbapi.com/?i=tt0133093&apikey=your_omdb_api_key
```

### 2 User API Integration

#### 2.1 Use Registeration

  **Endpoint**: `/register` 

  **Method**: `post`  


#### 2.2 Use Login

  **Endpoint**: `/login` 

  **Method**: `post`  



#### 2.1 POST /favorites/add
- `Add a movie to the user's favorites list.` 

**Endpoint**:

- `url`: /favorites/add
- `Method`: POST
- `Body (JSON)`:

  - ` userId`: The ID of the user adding the movie to favorites.
  - `movieId`: The IMDb ID of the movie.

**Example**:

  ```
  {
  "userId": "12345",
  "movieId": "tt1375666"
}
```

#### 2.2 POST /favorites/remove
- `Remove a movie to the user's favorites list if already Added.` 

**Endpoint**:

- `url`: /favorites/remove
- `Method`: POST
- `Body (JSON)`:

  - ` userId`: The ID of the user adding the movie to favorites.
  - `movieId`: The IMDb ID of the movie.

**Example**:

```
{
  "userId": "12345",
  "movieId": "tt1375666"
}
```

#### 2.3  GET /favorites/get
- `Remove a movie to the user's favorites list if already Added.`


**Endpoint**:

- `url`: /favorites/get
- `Method`: GET



## Deployment ##

### Frontend: ###
Frontend is Deployed on vercel.

### Backend: ###
Backend is Deployed on Render.
### Cloud Database ###

`-aiven.io` is used for clud database


## List of Implemented Features ##

### 1. Search for Movies ###

Users can search for movies by title.
Displays a list of movies with their titles, release year, and poster images.

### 2.  View Movie Details ###
Provides detailed information about a specific movie when selected.
Displays information like the release date, genre, director, actors, plot summary, IMDb rating, and box office earnings.

### 3. Add Movies to Favorites

Users can add movies to their personal favorites list.
Favorite movies are saved and easily accessible in the user’s profile.

### 4. Remove Movies from Favorites

Users can remove movies from their favorites list at any time.

### 5. Responsive Design

The app is fully responsive and adjusts to different screen sizes (desktop, tablet, mobile).

### 6. User Authentication (Future Feature)

 Integrated user authentication for a more personalized experience.
Users will be able to log in and manage their own favorite movie list.

### 7. Real-Time Movie Data
Fetches movie data from the OMDB API in real-time, ensuring that users always get up-to-date information about movies.

###  8. Backend API Integration

Node.js backend to manage the API calls and handle movie data.
Implements secure endpoints to handle user favorites using a JWT-based authentication system.

### 9. Search Auto-Complete

As users type the movie name in the search bar, suggestions pop up dynamically based on the OMDB API's data.
### 10. Cross-Platform Compatibility

Fully tested and optimized for cross-browser compatibility (Chrome, Firefox, Safari, Edge, etc.).


## Future Improvements
  
  #### 1. Plans to implement dark mode for users who prefer a darker interface.

#### 2. Implement pagination for search results to improve performance.
#### 3. Enhance the UI with better user experience features.

#### 3. Implementation of Movie Recomnedation System based on   user's prefrence and searches.

