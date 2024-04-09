import { Banner } from '@/components/Banner';
import Footer from '../footer';
import Header from '../header';
import Main from '../main';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
