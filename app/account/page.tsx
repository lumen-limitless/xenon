import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type PageProps = {
  params: {};
  searchParams: Record<string, string | Array<string> | undefined>;
};

export const metadata = {
  title: 'Account Settings',
};
export default async function Page({}: PageProps) {
  const session = await auth();
  return (
    <>
      <section className="py-10">
        <div className="container">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-full w-full flex-col items-center justify-center">
                <Avatar>
                  <AvatarFallback>
                    <Skeleton className="h-full w-full" />
                  </AvatarFallback>
                  <AvatarImage src={session?.user.image ?? ''} />
                </Avatar>

                <p>{session?.user.name}</p>
                <p>{session?.user.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
