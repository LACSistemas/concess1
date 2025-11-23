"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface VideoPlayerProps {
  src: string
  title: string
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <video
          src={src}
          controls
          className="w-full rounded-lg"
        >
          Seu navegador não suporta a tag de vídeo.
        </video>
      </CardContent>
    </Card>
  )
}
