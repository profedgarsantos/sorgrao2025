"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener("change", handler)

    return () => {
      mediaQuery.removeEventListener("change", handler)
    }
  }, [query])

  return matches
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 600px)")
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 601px) and (max-width: 960px)")
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 961px)")
}
