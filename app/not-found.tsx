import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <section className="py-20">
      <div className="container">
        <h1 className="mb-5 text-3xl">404 - page not found</h1>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </section>
  );
}
