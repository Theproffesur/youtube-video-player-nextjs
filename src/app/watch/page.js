"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

function WatchContent() {
  const searchParams = useSearchParams()
  // Default to a video ID or get it from URL parameter ?v=
  const videoId = searchParams.get("v") || "dQw4w9WgXcQ"
  
  // If a full playlist ID is passed via NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID or ?list=
  const playlistId = searchParams.get("list") || process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID

  const iframeSrc = playlistId
    ? `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1`

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-amber-400 font-serif tracking-wide">
          DELUXE SALOON
        </h1>
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl border-2 border-amber-500/30">
          <iframe
            className="w-full h-full"
            src={iframeSrc}
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  )
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 p-8 text-zinc-100 flex items-center justify-center">Loading Player...</div>}>
      <WatchContent />
    </Suspense>
  )
}
