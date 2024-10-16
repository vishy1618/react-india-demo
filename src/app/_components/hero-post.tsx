import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  // title: string;
  // coverImage: string;
  // date: string;
  // excerpt: string;
  // author: Author;
  // slug: string;

  artist: string
description: string
coverImage: string
genre: string
};

export function HeroPost({
  artist,
description,
coverImage,
genre,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={artist} src={coverImage} slug={description} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${description}`} className="hover:underline">
              {artist}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={new Date().toISOString()} />
          </div>
        </div>
      </div>
    </section>
  );
}
