"use client"

import api from "../api/api"
import { useState, useEffect } from "react"

interface RemoteConfig {
  maintenanceMode: boolean
  announcementMessage: string | null
  maxUploadSize: number
  // Outras configurações dinâmicas
}

// Valores padrão
const defaultRemoteConfig: RemoteConfig = {
  maintenanceMode: false,
  announcementMessage: null,
  maxUploadSize: 10 * 1024 * 1024, // 10MB
}

// Cache da configuração
let cachedConfig: RemoteConfig | null = null
let lastFetchTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

// Função para buscar configuração
export async function fetchRemoteConfig(): Promise<RemoteConfig> {
  const now = Date.now()

  // Usar cache se disponível e não expirado
  if (cachedConfig && now - lastFetchTime < CACHE_TTL) {
    return cachedConfig
  }

  try {
    const response = await api.get("/config")
    cachedConfig = { ...defaultRemoteConfig, ...response.data }
    lastFetchTime = now
    return cachedConfig
  } catch (error) {
    console.error("Failed to fetch remote config:", error)
    return defaultRemoteConfig
  }
}

// Hook para usar a configuração remota
export function useRemoteConfig() {
  const [config, setConfig] = useState<RemoteConfig>(defaultRemoteConfig)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadConfig() {
      try {
        const remoteConfig = await fetchRemoteConfig()
        if (isMounted) {
          setConfig(remoteConfig)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
          setLoading(false)
        }
      }
    }

    loadConfig()

    return () => {
      isMounted = false
    }
  }, [])

  return { config, loading, error, reload: () => setLoading(true) }
}
