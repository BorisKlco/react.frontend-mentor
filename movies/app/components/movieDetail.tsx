import { GenreColors, MovieItemProp } from "~/helpers";
import { LiaImdb } from "react-icons/lia";
import { Link } from "@remix-run/react";

type MovieProp = {
  item: MovieItemProp;
};

function time(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  const time = `${h}h:${m < 10 ? "0" : ""}${m}m`;

  return time;
}

export default function MovieItem({ item }: MovieProp) {
  const colors = GenreColors;
  console.log(item);
  return (
    <div className="w-full px-4 xl:py-2 h-full mx-auto ">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.backdrop_path})`,
        }}
        className={`bg-cover bg-center bg-no-repeat h-full w-full rounded-2xl overflow-hidden`}
      >
        <div className="flex flex-col justify-between w-full h-full backdrop-blur-sm backdrop-brightness-75 backdrop-grayscale-[.5]">
          <h1 className="text-white text-4xl px-4 py-6 flex justify-between items-center gap-3 drop-shadow-[0px_0px_1px_rgba(0,0,0)]">
            <span>
              {item.original_title}
              <p className="text-2xl pt-2">Duration: {time(item.runtime)}</p>
            </span>
            <Link to={`https://www.imdb.com/title/${item.imdb_id}`}>
              <span className="hover:text-green-600 cursor-pointer drop-shadow-[0px_0px_1px_rgba(0,0,0)]">
                <LiaImdb size={48} />
              </span>
            </Link>
          </h1>

          <div className="flex flex-col overflow-auto mt-8 py-4 px-2 text-balance backdrop-blur-sm bg-slate-950/40">
            <h2 className="text-2xl text-white w-[90%] mx-auto my-2">
              <span className="font-semibold">Release date: </span>
              {item.release_date}
            </h2>
            <div className="flex flex-wrap gap-4 w-[90%] mx-auto my-2">
              {item.genres.map((genre, i) => (
                <span
                  className={`py-[2px] px-[6px] rounded-md text-sm font-semibold ${
                    colors.length > i ? colors[i] : colors[i - colors.length]
                  }`}
                  key={genre.id}
                >
                  <p className="text-white drop-shadow-[0px_0px_1px_rgba(0,0,0)]">
                    {genre.name}
                  </p>
                </span>
              ))}
            </div>

            <h2 className="text-white text-2xl w-[90%] mx-auto">
              {item.overview}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
