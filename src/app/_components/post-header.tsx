import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  artist: string;
  description: string;
  coverImage: string;
  genre: string;
};

export function PostHeader({ artist, coverImage, genre, description }: Props) {
  return (
<>    
      <PostTitle>{artist}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={artist} src={coverImage} />
      </div>
</>
    
  );
}
