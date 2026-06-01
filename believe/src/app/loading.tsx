// src/app/loading.tsx
// Shown during route transitions and initial page loads

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-white/5" />
        <div className="space-y-2">
          <div className="h-6 w-48 bg-white/5 rounded-lg" />
          <div className="h-3 w-64 bg-white/5 rounded" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-white/5 rounded-xl" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-52 bg-white/5 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
