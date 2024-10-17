import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '@/app/_components/container';
import Header from '@/app/_components/header';
import { PostBody } from '@/app/_components/post-body';
import { PostHeader } from '@/app/_components/post-header';
import {
  getPostBySlug,
  getPostFromCMS,
} from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

export const dynamic = 'force-dynamic';

export default async function Post({ params }: Params) {
  const post = await getPostFromCMS(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      {/* <Alert preview={post.artist} /> */}
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            artist={post.artist}
            coverImage={post.coverImage}
            description={post.description}
            genre={post.genre}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.artist} 🚀`;

  return {
    title,
    openGraph: {
      title,
      images: [post.coverImage],
    },
  };
}
