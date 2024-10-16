import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { ar } from "date-fns/locale";

type Props = {
  // title: string;
  // coverImage: string;
  // date: string;
  // excerpt: string;
  // author: Author;
  // slug: string;

  artist: string;
  description: string;
  coverImage: string;
  genre: string;
};

export function PostPreview({
  artist,
description,
coverImage,
genre,
}: Props) {
  const yearFromDescription = parseInt(description.slice(-4)); //utah-84-1976
  const year = yearFromDescription || new Date().getFullYear();
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={description} title={artist} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${description}`} className="hover:underline">
        {typeof artist === 'string' ? artist.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : artist}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={new Date(year.toString()).toISOString()} />
      </div>
    </div>
  );
}
