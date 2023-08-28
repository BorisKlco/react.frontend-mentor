export interface MovieType {
  id: number;
  title: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const GenreColors = [
  "#0FCFD6",
  "#5BB07B",
  "#9560A8",
  "#E05F50",
  "#D9A5AA",
  "#DAC8F7",
  "#D9D8A9",
  "#FFAAA5",
  "#DCEDC1",
  "#A8E6CF",
  "#F8B195",
  "#F67280",
  "#C06C84",
  "#6C5B7B",
  "#355C7D",
  "#0FCFD6",
  "#5BB07B",
  "#9560A8",
  "#E05F50",
  "#D9A5AA",
  "#DAC8F7",
  "#D9D8A9",
  "#FFAAA5",
  "#DCEDC1",
  "#A8E6CF",
  "#F8B195",
  "#F67280",
  "#C06C84",
  "#6C5B7B",
  "#355C7D",
];

export const Genres = [
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 28,
    name: "Action",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
];
