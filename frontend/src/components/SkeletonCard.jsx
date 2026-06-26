export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-gray-200 animate-pulse" />

      {/* Body */}
      <div className="px-4 py-3 -mt-3 relative">
        <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm space-y-2">
          <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-100 rounded-md w-1/2 animate-pulse" />
          <div className="h-3 bg-gray-100 rounded-md w-full animate-pulse" />
          <div className="h-3 bg-gray-100 rounded-md w-4/5 animate-pulse" />
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="h-3 bg-gray-100 rounded-md w-32 animate-pulse" />
          <div className="h-5 bg-gray-100 rounded-full w-16 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
