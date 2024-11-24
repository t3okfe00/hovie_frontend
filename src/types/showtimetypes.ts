export interface Movie {
    id: string;
    title: string;
    duration: string;
    releaseDate: string;
    ageRating: string;
    image: string;
    genre: string;
    description: string;
  }
  
  export interface Showtime {
    time: string;
    endTime: string;
    theater: string;
    hall: string;
    language: string;
    title: string;
    poster: string;
    subtitles: string;
    available: string;
    is2D: boolean;
    ageRating: string;
    ticketUrl: string;
  }
  
  export interface Theater {
    id: string;
    name: string;
  }