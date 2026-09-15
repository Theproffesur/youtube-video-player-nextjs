import { Suspense } from 'react'

// 1. Rename your existing page component to something like WatchContent
function WatchContent() {
  // Your existing page logic (useSearchParams, etc.) goes here
  return (
    <div>
      {/* Existing JSX code */}
    </div>
  )
}

// 2. Export a default wrapper component with Suspense
export default function WatchPage() {
  return (
    <Suspense fallback={<div>Loading video...</div>}>
      <WatchContent />
    </Suspense>
  )
}
