type BannerProps = {}

export const Banner: React.FC<BannerProps> = ({}) => {
  return (
    <div className="flex w-full items-center justify-center bg-gradient-to-r from-purple-800 via-blue-800 to-purple-800 py-2 text-white backdrop-blur">
      Free shipping on all orders over $50!
    </div>
  )
}
