"use client"

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Film } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export function UploadZone({ onFileSelect, disabled = false }: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv']
    },
    maxFiles: 1,
    disabled,
    maxSize: 500 * 1024 * 1024 // 500MB
  })

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "cursor-pointer transition-all border-2 border-dashed",
        isDragActive && "border-primary bg-primary/5",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          {isDragActive ? (
            <Upload className="h-10 w-10 text-primary" />
          ) : (
            <Film className="h-10 w-10 text-primary" />
          )}
        </div>
        <input {...getInputProps()} />
        <h3 className="text-lg font-semibold mb-2">
          {isDragActive ? "Solte o vídeo aqui" : "Arraste o vídeo aqui"}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">
          ou clique para selecionar
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          Formatos: MP4, AVI, MOV, MKV
        </p>
        <p className="text-xs text-muted-foreground">
          Tamanho máximo: 500MB
        </p>
      </CardContent>
    </Card>
  )
}
