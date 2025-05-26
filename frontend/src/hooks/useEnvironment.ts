"use client"

import { useEffect, useState } from "react"
import config, { type EnvironmentConfig } from "../config/environment"

export function useEnvironment() {
  const [environment, setEnvironment] = useState<EnvironmentConfig>(config)
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return {
    ...environment,
    isOnline,
    isDevelopment: environment.environment === "development",
    isTest: environment.environment === "test",
    isStaging: environment.environment === "staging",
    isProduction: environment.environment === "production",
  }
}
