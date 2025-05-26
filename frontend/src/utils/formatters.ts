import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "-"

  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString)
    return format(date, "dd/MM/yyyy", { locale: ptBR })
  } catch (error) {
    console.error("Erro ao formatar data:", error)
    return dateString.toString()
  }
}

export const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "R$ 0,00"

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export const formatNumber = (value: number | null | undefined, decimals = 2): string => {
  if (value === null || value === undefined) return "0"

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
