import { Zap } from 'lucide-react'

type Props = {
  size?: 'sm' | 'md'
  className?: string
}

export function BrandLogo({ size = 'md', className = '' }: Props) {
  const box =
    size === 'sm'
      ? 'h-9 w-9 rounded-lg text-lg'
      : 'h-11 w-11 rounded-xl text-xl'
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-900/30 ${box} ${className}`}
    >
      <Zap className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} strokeWidth={2.5} />
    </div>
  )
}
