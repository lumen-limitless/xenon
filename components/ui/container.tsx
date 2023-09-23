import { cn } from '@/lib/utils'

interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
  className?: string
  id?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={cn('container', className)} {...props}>
      {children}
    </div>
  )
}

Container.displayName = 'Container'
