"use client"

export const dynamic = 'force-dynamic';

import useWatchSession from "@/hooks/useWatchSession"
import useYouTubePlayer from "@/hooks/useYouTubePlayer"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import MetricsTable from "./metricsTable"

const FASTAPI_ENDPOINT = "http://localhost:8002/api/video-events/"

export default function WatchPage() {
  const searchParams = useSearchParams()
  const videoId = searchParams.get("v")

  const { playerRef, isReady, videoData } = useYouTubePlayer(videoId)
  const { events, updateBackend } = useWatchSession(FASTAPI_ENDPOINT, videoId)

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
