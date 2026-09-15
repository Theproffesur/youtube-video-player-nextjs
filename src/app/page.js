"use client"

import { Suspense } from "react"
import useYouTubePlayer from "@/hooks/useYouTubePlayer"
import { useSearchParams } from "next/navigation"

function WatchContent() {
  const searchParams = useSearchParams()
  const videoId = searchParams.get("v") || "dQw4w9WgXcQ"

  const { playerRef, videoData } = useYouTubePlayer(videoId)

  return (
    <main className="min-h-screen p-8 bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-6">
        <div id="player" ref={playerRef} className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800" />
        {videoData && (
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">{videoData.title}</h1>
            <p className="text-zinc-400">{videoData.author}</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 p-8 text-zinc-100 flex items-center justify-center">Loading video player...</div>}>
      <WatchContent />
    </Suspense>
  )
}
