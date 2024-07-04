import { redirect } from 'next/navigation';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const runtime = 'nodejs';

export const revalidate = 0;

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '',
};
export default async function Page({}: PageProps) {
  return redirect('/manage/products');
}
