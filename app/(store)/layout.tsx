import { Banner } from '@/components/banner';
import Main from '../main';
import Footer from './footer';
import Header from './header';

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
