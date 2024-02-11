import { RedirectType, redirect } from 'next/navigation';

type PageProps = {
  params: {};
  searchParams: Record<string, string | Array<string> | undefined>;
};

export const metadata = {
  title: 'Account',
};
export default async function Page({}: PageProps) {
  return redirect('/account/orders', RedirectType.replace);
}
