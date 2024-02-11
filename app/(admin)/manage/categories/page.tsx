type PageProps = {
  params: {};
  searchParams: Record<string, string | Array<string> | undefined>;
};

export const metadata = {
  title: 'Manage Categories',
};
export default async function Page({}: PageProps) {
  return (
    <>
      <section title="Manage Categories">
        <p>Manage Categories</p>
      </section>
    </>
  );
}
