import { SanityContent } from '@/components/sanity-content';
import { client } from '@/sanity/lib/client';
import { Metadata, ResolvingMetadata } from 'next';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

async function getArticle(slug: string): Promise<{
  title: string;
  content: any[];
  slug: string;
} | null> {
  try {
    const article = await client.fetch(
      groq`*[_type == "article" && slug.current == $slug][0]`,
      { slug },
    );
    console.debug(article);
    return article;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (article === null) return notFound();

  return {
    title: article.title as string,
    openGraph: {
      type: 'article',
    },
  };
}

export default async function Page({ params }: PageProps) {
  const article = await getArticle(params.slug);
  if (article === null) return notFound();

  console.debug(article);

  return (
    <div className="markdown-content">
      <SanityContent content={article.content} />
    </div>
  );
}
