"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, X } from 'lucide-react'

interface ProcessingStatusProps {
  currentFrame: number
  totalFrames: number
  detectedCount: number
  elapsedTime: string
  estimatedTime: string
  onCancel: () => void
}

export function ProcessingStatus({
  currentFrame,
  totalFrames,
  detectedCount,
  elapsedTime,
  estimatedTime,
  onCancel
}: ProcessingStatusProps) {
  const progress = (currentFrame / totalFrames) * 100

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Processando...
          </CardTitle>
          <Badge variant="secondary">
            Frame: {currentFrame}/{totalFrames}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />
        <div className="text-sm text-muted-foreground">
          {progress.toFixed(1)}% concluído
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold mb-3">Estatísticas em Tempo Real</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Detectados:</span>
              <span className="font-medium">{detectedCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tempo decorrido:</span>
              <span className="font-medium">{elapsedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tempo estimado:</span>
              <span className="font-medium">{estimatedTime}</span>
            </div>
          </div>
        </div>

        <Button
          variant="destructive"
          className="w-full mt-4"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar Processamento
        </Button>
      </CardContent>
    </Card>
  )
}
