import { Loader2 } from 'lucide-react'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background">
      <Loader2 className="animate-spin" size={64} color="#000" />
    </div>
  )
}
