import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

const convertToTitleCase = (str: string) => {
  return typeof str === 'string' ? str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : str;
};

type Props = {
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
  const yearFromDescription = parseInt(description.slice(-4));
  const year = yearFromDescription || new Date().getFullYear();

  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={artist} src={coverImage} slug={description} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${description}`} className="hover:underline">
            {convertToTitleCase(artist)}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={new Date(year.toString()).toISOString()} />
          </div>
        </div>
      </div>
    </section>
  );
}
