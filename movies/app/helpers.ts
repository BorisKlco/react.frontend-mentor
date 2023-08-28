export interface ItemType {
  id: number;
  title: string;
  name?: string;
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
  "bg-sky-600",
  "bg-emerald-600",
  "bg-fuchsia-600",
  "bg-red-600",
  "bg-amber-600",
  "bg-green-600",
  "bg-orange-600",
  "bg-rose-600",
  "bg-gray-600",
  "bg-slate-600",
  "bg-zinc-600",
  "bg-neutral-600",
  "bg-stone-600",
  "bg-yellow-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-purple-600",
  "bg-pink-600",
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
