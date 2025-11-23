"use client"

import React, { useState } from 'react'
import { Film, Users, Car, Download, FileText, Check, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { UploadZone } from '@/components/upload-zone'
import { VideoPlayer } from '@/components/video-player'
import { StatsCard } from '@/components/stats-card'
import { ProcessingStatus } from '@/components/processing-status'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type CounterType = 'people' | 'vehicles'
type ProcessingState = 'idle' | 'processing' | 'completed' | 'error'

interface ProcessingData {
  currentFrame: number
  totalFrames: number
  detectedCount: number
  elapsedTime: string
  estimatedTime: string
}

interface ResultData {
  totalDetected: number
  maxDetected: number
  avgDetected: number
  videoUrl: string
  chartData: { frame: number; count: number }[]
  vehicleBreakdown?: {
    cars: number
    motorcycles: number
    buses: number
    trucks: number
  }
}

export default function Home() {
  const [counterType, setCounterType] = useState<CounterType>('people')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [confidence, setConfidence] = useState([0.5])
  const [saveOutput, setSaveOutput] = useState(true)
  const [processingState, setProcessingState] = useState<ProcessingState>('idle')
  const [processingData, setProcessingData] = useState<ProcessingData | null>(null)
  const [resultData, setResultData] = useState<ResultData | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setProcessingState('idle')
    setResultData(null)
  }

  const handleProcess = () => {
    if (!selectedFile) return

    // Simulação de processamento
    setProcessingState('processing')
    setProcessingData({
      currentFrame: 0,
      totalFrames: 900,
      detectedCount: 0,
      elapsedTime: '00:00',
      estimatedTime: '02:30'
    })

    // Simular progresso
    let frame = 0
    const interval = setInterval(() => {
      frame += 30
      if (frame >= 900) {
        clearInterval(interval)
        setProcessingState('completed')
        setResultData({
          totalDetected: counterType === 'people' ? 156 : 89,
          maxDetected: counterType === 'people' ? 24 : 18,
          avgDetected: counterType === 'people' ? 14.5 : 9.8,
          videoUrl: URL.createObjectURL(selectedFile),
          chartData: Array.from({ length: 30 }, (_, i) => ({
            frame: i * 30,
            count: Math.floor(Math.random() * 20) + 5
          })),
          ...(counterType === 'vehicles' && {
            vehicleBreakdown: {
              cars: 45,
              motorcycles: 23,
              buses: 8,
              trucks: 13
            }
          })
        })
      } else {
        setProcessingData({
          currentFrame: frame,
          totalFrames: 900,
          detectedCount: Math.floor(Math.random() * 20),
          elapsedTime: `00:${Math.floor(frame / 15).toString().padStart(2, '0')}`,
          estimatedTime: `02:${(150 - Math.floor(frame / 6)).toString().padStart(2, '0')}`
        })
      }
    }, 100)
  }

  const handleCancel = () => {
    setProcessingState('idle')
    setProcessingData(null)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setProcessingState('idle')
    setProcessingData(null)
    setResultData(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Film className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">YOLOv11 Video Counter</h1>
          </div>
          <p className="text-muted-foreground">
            Sistema de contagem de pessoas e veículos em vídeos usando YOLOv11
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={counterType} onValueChange={(v) => setCounterType(v as CounterType)}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="people" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Pessoas
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Veículos
            </TabsTrigger>
          </TabsList>

          <TabsContent value={counterType} className="space-y-6">
            {processingState === 'idle' && !resultData && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload de Vídeo</CardTitle>
                  <CardDescription>
                    {counterType === 'people'
                      ? 'Faça upload de um vídeo para contar pessoas'
                      : 'Faça upload de um vídeo para contar veículos'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <UploadZone onFileSelect={handleFileSelect} />

                  {selectedFile && (
                    <Alert>
                      <Check className="h-4 w-4" />
                      <AlertTitle>Arquivo selecionado</AlertTitle>
                      <AlertDescription>
                        {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Threshold de Confiança: {confidence[0].toFixed(2)}
                      </label>
                      <Slider
                        value={confidence}
                        onValueChange={setConfidence}
                        min={0}
                        max={1}
                        step={0.05}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Valores maiores reduzem falsos positivos, valores menores detectam mais objetos
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleProcess}
                    disabled={!selectedFile}
                    className="w-full"
                    size="lg"
                  >
                    Processar Vídeo
                  </Button>
                </CardContent>
              </Card>
            )}

            {processingState === 'processing' && processingData && (
              <ProcessingStatus
                currentFrame={processingData.currentFrame}
                totalFrames={processingData.totalFrames}
                detectedCount={processingData.detectedCount}
                elapsedTime={processingData.elapsedTime}
                estimatedTime={processingData.estimatedTime}
                onCancel={handleCancel}
              />
            )}

            {processingState === 'completed' && resultData && (
              <div className="space-y-6">
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertTitle>Processamento Concluído!</AlertTitle>
                  <AlertDescription>
                    Seu vídeo foi processado com sucesso. Veja os resultados abaixo.
                  </AlertDescription>
                </Alert>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatsCard
                    title="Total Detectado"
                    value={resultData.totalDetected}
                    subtitle={counterType === 'people' ? 'pessoas' : 'veículos'}
                    icon={counterType === 'people' ? Users : Car}
                  />
                  <StatsCard
                    title="Máximo"
                    value={resultData.maxDetected}
                    subtitle="em um frame"
                  />
                  <StatsCard
                    title="Média"
                    value={resultData.avgDetected.toFixed(1)}
                    subtitle="por frame"
                  />
                </div>

                {/* Vehicle Breakdown */}
                {counterType === 'vehicles' && resultData.vehicleBreakdown && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Detalhamento por Tipo de Veículo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 rounded-lg border">
                          <div className="text-3xl mb-2">🚗</div>
                          <div className="text-2xl font-bold">{resultData.vehicleBreakdown.cars}</div>
                          <div className="text-sm text-muted-foreground">Carros</div>
                        </div>
                        <div className="text-center p-4 rounded-lg border">
                          <div className="text-3xl mb-2">🏍️</div>
                          <div className="text-2xl font-bold">{resultData.vehicleBreakdown.motorcycles}</div>
                          <div className="text-sm text-muted-foreground">Motos</div>
                        </div>
                        <div className="text-center p-4 rounded-lg border">
                          <div className="text-3xl mb-2">🚌</div>
                          <div className="text-2xl font-bold">{resultData.vehicleBreakdown.buses}</div>
                          <div className="text-sm text-muted-foreground">Ônibus</div>
                        </div>
                        <div className="text-center p-4 rounded-lg border">
                          <div className="text-3xl mb-2">🚚</div>
                          <div className="text-2xl font-bold">{resultData.vehicleBreakdown.trucks}</div>
                          <div className="text-sm text-muted-foreground">Caminhões</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contagem ao Longo do Tempo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={resultData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="frame" label={{ value: 'Frame', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Contagem', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          name={counterType === 'people' ? 'Pessoas' : 'Veículos'}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Video Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <VideoPlayer src={resultData.videoUrl} title="Vídeo Original" />
                  <VideoPlayer src={resultData.videoUrl} title="Vídeo Processado" />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Vídeo
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Download CSV
                  </Button>
                  <Button onClick={handleReset} className="flex-1">
                    Processar Novo Vídeo
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
