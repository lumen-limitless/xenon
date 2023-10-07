import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <Section className="py-20">
      <Container>
        <h1 className="mb-5 text-3xl">404 - page not found</h1>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </Container>
    </Section>
  )
}
