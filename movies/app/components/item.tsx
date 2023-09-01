import { Form, Link, useLocation } from "@remix-run/react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { GenreColors, Genres } from "~/helpers";
import type { ItemType } from "~/helpers";

export default function Item({
  item,
  bookmark,
}: {
  item: ItemType;
  bookmark: boolean;
}) {
  const path = useLocation();
  const genreID = Genres;
  const colors = GenreColors;
  return (
    <div key={item.id} className="group relative overflow-hidden rounded-md">
      <Form method="post" action="/bookmarks/add">
        <button className="group/fav absolute right-3 top-3 rounded-full h-12 aspect-square bg-black/40 z-10 grid place-content-center">
          <input type="hidden" name="path" value={path.pathname} />
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="type" value={item.media_type} />
          <BsFillBookmarkHeartFill
            className={`h-5 w-auto text-white transition group-hover/fav:text-sky-600 group-hover/fav:rotate-6 ${
              bookmark
                ? "text-green-400 drop-shadow-[0px_0px_1px_rgba(0,0,0)] "
                : ""
            }`}
          />
        </button>
      </Form>
      <Link
        to={`/detail/${item.id}?type=${
          item.media_type == "movie" ? "movie" : "tv"
        }`}
      >
        <div className="group/info absolute bottom-0 w-full bg-black/40 z-10 grid place-content-start p-2 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur">
          <h1 className="text-white text-xl font-semibold">
            {item.title ?? item.name}
          </h1>
          <div className="min-[930px]:my-2 flex flex-wrap gap-2">
            {item.genre_ids.map((genre, i) => (
              <span
                className={`py-[2px] px-[6px] rounded-md text-sm hidden min-[930px]:block font-semibold ${
                  colors.length > i ? colors[i] : colors[i - colors.length]
                }`}
                key={genre}
              >
                <p className="text-white drop-shadow-[0px_0px_1px_rgba(0,0,0)]">
                  {genreID.map((item: any) => {
                    if (item.id == genre) {
                      return item.name;
                    }
                    return null;
                  })}
                </p>
              </span>
            ))}
          </div>
          <p className="text-white line-clamp-3 my-2">{item.overview}</p>
        </div>

        <img
          className="max-[400px]:h-48 max-[929px]:h-64 min-[930px]:h-[26rem] object-cover transition group-hover:scale-[1.02] contrast-[0.95] group-hover:contrast-[1.02] z-1"
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          alt=""
        />
      </Link>
    </div>
  );
}
