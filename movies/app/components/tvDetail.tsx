import { GenreColors, TvItemProp } from "~/helpers";

type TvProp = {
  item: TvItemProp;
};

export default function TvItem({ item }: TvProp) {
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
              {item.name ?? item.original_name}
              <p className="text-2xl pt-2">{item.type}</p>
            </span>
          </h1>

          <div className="flex flex-col overflow-auto mt-8 py-4 px-2 text-balance backdrop-blur-sm bg-slate-950/40">
            <h2 className="text-2xl text-white w-[90%] mx-auto my-2">
              <span className="font-semibold">Seasons: </span>
              {item.number_of_seasons}
            </h2>
            {item.episode_run_time.length ? (
              <h2 className="text-2xl text-white w-[90%] mx-auto my-2">
                <span className="font-semibold">Current Episode: </span>
                {item.episode_run_time}
              </h2>
            ) : null}

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
