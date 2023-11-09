import { APP_NAME } from '@/lib/constants'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'

export const SearchBar: React.FC = () => {
  const router = useRouter()
  const handleSubmit = (formData: FormData) => {
    console.log(formData)
    const query = formData.get('query')?.toString()
    if (!query) return
    router.push(`/search?query=${formData.get('query')}`)
  }
  return (
    <form className="relative w-full" action={handleSubmit}>
      <Input
        aria-label="Search"
        type="search"
        name="query"
        id="query"
        placeholder={`Search ${APP_NAME}`}
        className="pl-12"
      />
      <Search className="absolute left-3 top-1/2 h-6 -translate-y-1/2" />
    </form>
  )
}
