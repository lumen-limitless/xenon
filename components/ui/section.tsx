import { cn } from '@/lib/utils'

interface SectionProps extends React.ComponentPropsWithoutRef<'section'> {}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  ...props
}: SectionProps) => {
  return (
    <section className={cn('relative flex', className)} {...props}>
      {children}
    </section>
  )
}

Section.displayName = 'Section'
