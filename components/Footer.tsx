import { APP_DESCRIPTION } from '@/lib/constants'

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative flex flex-col bg-foreground text-background"
    >
      <div className="container h-72 py-10">
        <object data="/Xe.svg" type="" className="h-24" />
        <p className="text-muted">{APP_DESCRIPTION}</p>
      </div>
      <div className="mt-auto border-t border-muted-foreground py-5">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Lumen Limitless. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
