import { RouteSelector } from './RouteSelector'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteSelector />
      {children}
    </>
  )
}
