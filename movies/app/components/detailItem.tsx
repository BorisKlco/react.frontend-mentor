import { MovieItemProp, TvItemProp } from "~/helpers";

type DetailItemProps = {
  item: MovieItemProp | TvItemProp;
  type: string;
};

export default function DetailItem({ item, type }: DetailItemProps) {
  return (
    <div className="w-full px-4 xl:py-2 h-full mx-auto ">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.backdrop_path})`,
        }}
        className={`bg-cover bg-center bg-no-repeat h-full w-full rounded-2xl overflow-hidden`}
      >
        <div className="w-full h-full backdrop-blur-sm backdrop-brightness-75 backdrop-grayscale-[.5]">
          <h1 className="text-white text-4xl">123</h1>
        </div>
      </div>
    </div>
  );
}
