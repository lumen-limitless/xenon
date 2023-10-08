type MainProps = {
  children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main id="main" className="flex flex-grow flex-col">
      {children}
    </main>
  )
}

export default Main
