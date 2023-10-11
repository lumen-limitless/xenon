import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'

export const SearchBar = () => {
  const router = useRouter()
  const handleSubmit = (formData: FormData) => {
    console.log(formData)
    const query = formData.get('query')?.toString()
    if (!query) return
    router.push(`/search?query=${formData.get('query')}`)
  }
  return (
    <form className="flex w-full items-center" action={handleSubmit}>
      <Input name="query" id="query" placeholder={`Search ${APP_NAME}`} />
      <Button variant="ghost" type="submit">
        <Search className="h-6" />
      </Button>
    </form>
  )
}
