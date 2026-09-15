"use client"

import { Suspense } from "react"
import useWatchSession from "@/hooks/useWatchSession"
import useYouTubePlayer from "@/hooks/useYouTubePlayer"
import { useSearchParams } from "next/navigation"
import MetricsTable from "./metricsTable"

const FASTAPI_ENDPOINT = "http://localhost:8002/api/video-events/"

function WatchContent() {
  const searchParams = useSearchParams()
  const videoId = searchParams.get("v")

  const { playerRef, videoData } = useYouTubePlayer(videoId)
  const { events } = useWatchSession(FASTAPI_ENDPOINT, videoId)

  return (
    <main className="min-h-screen p-8 bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <div id="player" ref={playerRef} className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-900" />
        {videoData && (
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{videoData.title}</h1>
            <p className="text-zinc-400">{videoData.author}</p>
          </div>
        )}
        <MetricsTable events={events} />
      </div>
    </main>
  )
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 p-8 text-zinc-100">Loading video player...</div>}>
      <WatchContent />
    </Suspense>
  )
}
