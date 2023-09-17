import { cn } from '@/lib/utils'

interface SectionProps
  extends React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement> {}

export const Section: React.FC<SectionProps> = ({
  children,
  className,

  ...props
}: SectionProps) => {
  return (
    <section
      className={cn(
        'relative flex h-full w-full flex-grow items-center',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

Section.displayName = 'Section'
