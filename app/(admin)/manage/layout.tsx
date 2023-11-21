import { RouteSelector } from './users/RouteSelector'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteSelector />
      {children}
    </>
  )
}
