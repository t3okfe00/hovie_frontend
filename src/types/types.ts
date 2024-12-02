// console.log("Types");

export interface Movie {
    id: string;
    title: string;
    type: 'movie' | 'tv';
    posterUrl: string;
    year: number;
  }
  
  export interface User {
    id: string;
    name: string;
    avatar: string;
    favorites: Movie[];
  }