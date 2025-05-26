import type React from "react"
import { useEnvironment } from "../../hooks/useEnvironment"
import { Chip } from "@mui/material"

export const EnvironmentIndicator: React.FC = () => {
  const env = useEnvironment()

  // Não mostrar em produção para usuários finais
  if (env.isProduction && !env.debug) {
    return null
  }

  const getColor = () => {
    switch (env.environment) {
      case "development":
        return "info"
      case "test":
        return "warning"
      case "staging":
        return "secondary"
      case "production":
        return "error" // Vermelho em produção para alertar
      default:
        return "default"
    }
  }

  return (
    <Chip
      label={`${env.environment.toUpperCase()} v${env.version}`}
      color={getColor()}
      size="small"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
        opacity: 0.8,
      }}
    />
  )
}
