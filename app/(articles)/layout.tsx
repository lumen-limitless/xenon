export const runtime = 'nodejs';
export const revalidate = false;
export const dynamic = 'auto';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
