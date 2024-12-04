export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  profileUrl: string;
  createdAt: string;
};

export type AuthContextType = {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  signUp: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<User>;
  logout: () => void;
  deleteAcc: () => void;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
};

export type CreateUserInput = {
  email: string;
  password: string;
  name: string;
  profileUrl: string;
};

export type Group = {
  id: number;
  name: string;
  ownersId: number;
};

export type CreateGroupInput = {
  name: string;
  ownersId: number;
};

export type IdGroupInput = {
  id: number;
};

export type UidIdGroupInput = {
  id: number;
  userId: number;
};

export type RemoveMemberInput = {
  id: number;
  userId: number;
  ownerId: number | null;
};

export type GroupContent = {
  id: number;
  timestamp: string | null;
  addedByUserId: number;
  groupsId: number;
  movieId: number;
};

export type CreateGroupContentInput = {
  addedByUserId: number;
  groupsId: number;
  movieId: number;
};

export type JoinGroupInput = {
  id: number;
  userId: number;
  ownerId: number;
};

// Movie Type - Represents a movie object returned by TMDB API
export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  genres: Genre[];
  runtime: number; // in minutes
  tagline: string;
  poster_path: string; // Image path, to be used with TMDB base URL
  backdrop_path: string; // Image path, to be used with TMDB base URL
  vote_average: number; // Rating out of 10
  voteCount: number;
  popularity: number; // Popularity score from TMDB
  adult: boolean; // True if the movie is for adults
  status: string;
  imdb_id: string;
};

// Genre Type - Represents a movie genre
export type Genre = {
  id: number;
  name: string;
};

// Movie Credits Type - Represents the cast and crew associated with a movie
// Cast Type - Represents an actor in the movie
export interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null; // Gender might be null for unknown gender
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null; // Path might be null if no profile image is available
}

export interface CrewMember {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number | null;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// Movie Similar Movies Type - Represents similar movies to a given movie
export type SimilarMovies = {
  id: number;
  results: Movie[];
};

// Movie Recommendations Type - Represents movie recommendations for a given movie
export type MovieRecommendations = {
  id: number;
  results: Movie[];
};

// Movie Videos Type - Represents the videos associated with a movie (trailers, etc.)
export type MovieVideos = {
  id: number;
  results: Video[];
};

// Video Type - Represents a video (e.g., trailer, behind-the-scenes)
export type Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string; // e.g., YouTube
  size: number;
  type: string; // e.g., "Trailer"
};

// Movie Images Type - Represents the images (posters, backdrops) associated with a movie
export type MovieImages = {
  id: number;
  backdrops: Image[];
  posters: Image[];
};

// Image Type - Represents an image (either backdrop or poster)
export type Image = {
  filePath: string;
  width: number;
  height: number;
  aspectRatio: number;
  voteAverage: number;
  voteCount: number;
};

// Movie Release Dates Type - Represents movie release dates in different regions
export type MovieReleaseDates = {
  id: number;
  results: Release[];
};

// Release Type - Represents a release date for a movie in a region
export type Release = {
  iso_3166_1: string; // Country code (e.g., US, GB)
  releaseDates: ReleaseDate[];
};

// ReleaseDate Type - Represents a specific release date for a region
export type ReleaseDate = {
  certification: string; // Movie certification (e.g., "PG-13")
  releaseDate: string; // Release date in YYYY-MM-DD format
  type: number; // Release type (e.g., premiere, general release)
};

// Popular Movies Response Type - Represents the response when fetching popular movies
export type PopularMoviesResponse = {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
};

// Search Movies Response Type - Represents the response when searching for movies
export type SearchMoviesResponse = {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
};

// Movie Genres Response Type - Represents the genres available on TMDB
export type MovieGenresResponse = {
  genres: Genre[];
};

export type MovieRecommendation = {
  id: number;
  title: string;
  voteAverage: number;
};

export interface Favorite {
  id: number; // Unique identifier for the favorite
  addedAt: string; // The date when the movie was added to the favorites
  usersId: number; // The ID of the user who added the movie to their favorites
  moviesId: number; // The ID of the movie
  movieName: string; // The name of the movie
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  description: string;
  usersId: number;
}

export interface reviewData {
  rating: number;
  comment: string;
}
