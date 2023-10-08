'use client'

const Footer = () => {
  return (
    <footer
      id="footer"
      className="flex h-16 items-center border-t border-secondary"
    >
      <div className="container">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Lumen Limitless. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
