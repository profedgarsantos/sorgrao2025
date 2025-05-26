import { Chip, type ChipProps } from "@mui/material"

interface StatusBadgeProps extends Omit<ChipProps, "color"> {
  status: "active" | "inactive" | "pending" | "completed" | "canceled"
}

const StatusBadge = ({ status, ...props }: StatusBadgeProps) => {
  const getColor = (): ChipProps["color"] => {
    switch (status) {
      case "active":
        return "success"
      case "inactive":
        return "default"
      case "pending":
        return "warning"
      case "completed":
        return "info"
      case "canceled":
        return "error"
      default:
        return "default"
    }
  }

  const getLabel = (): string => {
    switch (status) {
      case "active":
        return "Ativo"
      case "inactive":
        return "Inativo"
      case "pending":
        return "Pendente"
      case "completed":
        return "Concluído"
      case "canceled":
        return "Cancelado"
      default:
        return ""
    }
  }

  return <Chip color={getColor()} label={getLabel()} size="small" {...props} />
}

export default StatusBadge
