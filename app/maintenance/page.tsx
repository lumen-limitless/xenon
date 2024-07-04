import { Wrench } from 'lucide-react';

type PageProps = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

export const runtime = 'nodejs';

export const revalidate = false;

export const dynamic = 'auto';

export const metadata = {
  title: 'Maintenance',
};
export default async function Page({}: PageProps) {
  return (
    <>
      <section className="min-h-screen py-20">
        <div className="container flex flex-col items-center justify-center">
          <Wrench size={64} />
          <h1 className="text-3xl font-bold">Under Maintenance</h1>
          <p>
            Our site is currently undergoing maintenance. Please check back
            later.
          </p>
        </div>
      </section>
    </>
  );
}
