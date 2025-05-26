import { get, set, del, keys } from "idb-keyval"

// Tipos para as operações pendentes
export interface PendingOperation {
  id: string
  url: string
  method: string
  data: any
  timestamp: number
}

// Prefixos para diferentes tipos de dados
const CACHE_PREFIX = "sorgrao_cache_"
const PENDING_OPS_KEY = "sorgrao_pending_operations"

// Função para salvar dados no cache
export const saveToCache = async (key: string, data: any): Promise<void> => {
  try {
    await set(`${CACHE_PREFIX}${key}`, {
      data,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Erro ao salvar no cache:", error)
  }
}

// Função para obter dados do cache\
export const getFromCache = async <T>(key: string)
: Promise<T | null> =>
{
  try {
    const cachedData = await get(`${CACHE_PREFIX}${key}`)
    return cachedData ? cachedData.data : null;
  } catch (error) {
    console.error("Erro ao obter do cache:", error)
    return null;
  }
}

// Função para remover dados do cache
export const removeFromCache = async (key: string): Promise<void> => {
  try {
    await del(`${CACHE_PREFIX}${key}`)
  } catch (error) {
    console.error("Erro ao remover do cache:", error)
  }
}

// Função para limpar cache antigo
export const clearOldCache = async (maxAgeInDays = 7): Promise<void> => {
  try {
    const allKeys = await keys()
    const now = Date.now()
    const maxAge = maxAgeInDays * 24 * 60 * 60 * 1000

    for (const key of allKeys) {
      if (typeof key === "string" && key.startsWith(CACHE_PREFIX)) {
        const value = await get(key)
        if (value && value.timestamp && now - value.timestamp > maxAge) {
          await del(key)
        }
      }
    }
  } catch (error) {
    console.error("Erro ao limpar cache antigo:", error)
  }
}

// Função para adicionar uma operação pendente
export const addPendingOperation = async (operation: Omit<PendingOperation, "id" | "timestamp">): Promise<void> => {
  try {
    const pendingOps = await getPendingOperations()
    const newOperation: PendingOperation = {
      ...operation,
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    }

    pendingOps.push(newOperation)
    await set(PENDING_OPS_KEY, pendingOps)
  } catch (error) {
    console.error("Erro ao adicionar operação pendente:", error)
  }
}

// Função para obter todas as operações pendentes
export const getPendingOperations = async (): Promise<PendingOperation[]> => {
  try {
    const pendingOps = await get(PENDING_OPS_KEY)
    return pendingOps || []
  } catch (error) {
    console.error("Erro ao obter operações pendentes:", error)
    return []
  }
}

// Função para remover uma operação pendente
export const removePendingOperation = async (id: string): Promise<void> => {
  try {
    const pendingOps = await getPendingOperations()
    const filteredOps = pendingOps.filter((op) => op.id !== id)
    await set(PENDING_OPS_KEY, filteredOps)
  } catch (error) {
    console.error("Erro ao remover operação pendente:", error)
  }
}

// Função para processar operações pendentes quando online
export const processPendingOperations = async (apiClient: any): Promise<void> => {
  if (!navigator.onLine) return

  try {
    const pendingOps = await getPendingOperations()

    for (const operation of pendingOps) {
      try {
        await apiClient({
          url: operation.url,
          method: operation.method,
          data: operation.data,
        })

        // Se a operação for bem-sucedida, remova-a da lista
        await removePendingOperation(operation.id)
      } catch (error) {
        console.error(`Erro ao processar operação pendente ${operation.id}:`, error)
        // Mantenha a operação na lista para tentar novamente mais tarde
      }
    }
  } catch (error) {
    console.error("Erro ao processar operações pendentes:", error)
  }
}
