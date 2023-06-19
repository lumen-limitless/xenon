'use client'

import { Search, ShoppingCart } from 'lucide-react'
import Nav from './Nav'
import { Button } from './ui/button'
import useCartStore from '@/lib/store'
import { Input } from './ui/input'
import Link from 'next/link'
import NextSVG from 'public/next.svg'
export default function Header() {
  const { items } = useCartStore()

  return (
    <header id="header" className="sticky top-0 z-20 border-b border-secondary">
      <div className="relative flex h-16 w-full items-center justify-between bg-background px-5">
        <Link href="/">
          <NextSVG className="h-10 cursor-pointer" />
        </Link>

        <div className="mx-5 flex w-full  max-w-lg items-center gap-3">
          <Search />
          <Input placeholder="Search products..." />
        </div>
        <Nav />
        <div className="relative">
          <Link href="/cart">
            <Button variant={'ghost'}>
              <ShoppingCart />
            </Button>
          </Link>

          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
              {items.length}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
