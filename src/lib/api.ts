import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import { Post } from '@/interfaces/post';

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, description: realSlug, content } as Post;
}

export async function getPostFromCMS(slug: string) {
  const apiURL = process.env.CONTENTSTACK_API_URL;
  const response = await fetch(`${apiURL}/v3/content_types/post/entries?query={"title":"${slug}.md"}`, {
    method: 'GET',
    headers: {
      'access_token': process.env.CONTENTSTACK_DELIVERY_TOKEN as string,
      'api_key': process.env.CONTENTSTACK_API_KEY as string,
    }
  });
  const responseBody = await response.json();
  if (!response.ok) {
    console.log(responseBody);
    throw new Error('Error fetching entry');
  }

  const contents = responseBody.entries[0].markdown;
  const { data, content } = matter(contents);

  return { ...data, description: slug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
  return posts;
}
