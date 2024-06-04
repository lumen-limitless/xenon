import { redirect } from 'next/navigation';

type PageProps = {
  params: {};
  searchParams: Record<string, string | Array<string> | undefined>;
};

export const metadata = {
  title: 'Manage Store',
};
export default async function Page({}: PageProps) {
  redirect('/manage/dashboard');
  return <></>;
}
