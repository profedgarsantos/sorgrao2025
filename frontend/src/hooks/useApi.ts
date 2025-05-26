"use client"

import { useState, useEffect } from "react"
import api from "../api/api"
import { fallbackData } from "../api/fallbackData"
import { useEnvironment } from "./useEnvironment"

export function useApi<T>(endpoint: string, defaultValue: T | null = null) {
  const [data, setData] = useState<T | null>(defaultValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { isOnline } = useEnvironment()

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        // Se estiver offline, use dados de fallback se disponíveis
        if (!isOnline) {
          const fallback = (fallbackData as any)[endpoint.split("/").pop()]
          if (fallback) {
            setData(fallback as T)
            setLoading(false)
            return
          }
        }

        const response = await api.get(endpoint)
        if (isMounted) {
          setData(response.data)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
          setLoading(false)

          // Tente usar dados de fallback em caso de erro
          const fallback = (fallbackData as any)[endpoint.split("/").pop()]
          if (fallback) {
            setData(fallback as T)
          }
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [endpoint, isOnline])

  return { data, loading, error, refetch: () => setLoading(true) }
}
