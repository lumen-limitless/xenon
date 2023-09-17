import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Nav } from './Nav'

export default async function Header() {
  const session = await getServerSession(authOptions)
  return (
    <header id="header" className="sticky top-0 z-20 border-b border-secondary">
      <div className="relative flex h-16 w-full items-center justify-between bg-background px-5">
        <Link href="/">
          <object data="logo.svg" className="h-10 cursor-pointer" />
        </Link>

        {/* <div className="mx-5 hidden w-full max-w-lg items-center gap-3 lg:flex">
          <Search />
          <Input placeholder="Search products..." />
        </div> */}
        <Nav session={session} />
      </div>
    </header>
  )
}
