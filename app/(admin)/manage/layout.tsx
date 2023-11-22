import { RouteSelector } from '@/components/RouteSelector'

const routes = [
  { name: 'Products', path: '/manage/products' },
  { name: 'Orders', path: '/manage/orders' },
  { name: 'Categories', path: '/manage/categories' },
  { name: 'Users', path: '/manage/users' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteSelector routes={routes} />
      {children}
    </>
  )
}
