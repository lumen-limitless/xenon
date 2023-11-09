'use client'

import { cn } from '@/lib/utils'
import { type CartInfo } from '@types'
import { type Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { Nav } from './Nav'
import { SearchBar } from './SearchBar'

const scrollThreshold = 100

type HeaderProps = {
  session: Session | null
  cart: CartInfo | null
}

const Header: React.FC<HeaderProps> = ({ session, cart }) => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(true)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      setVisible(
        prevScrollPos > currentScrollPos || currentScrollPos < scrollThreshold,
      )
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])

  return (
    <header
      id="header"
      className={cn(
        'sticky top-0 z-40 w-full border-b bg-background transition-all duration-300 ease-in-out',
        visible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <Nav session={session} cart={cart} />
      <div className="bg-background">
        <div className="container flex py-1 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

export default Header
