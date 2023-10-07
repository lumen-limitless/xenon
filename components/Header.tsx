'use client'

import { cn } from '@/lib/utils'
import { type CustomSession } from '@/types'
import { useEffect, useState } from 'react'
import Nav from './Nav'

const scrollThreshold = 100

type HeaderProps = {
  session: CustomSession | null
}

const Header: React.FC<HeaderProps> = ({ session }) => {
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
      <Nav session={session} />
    </header>
  )
}

export default Header
