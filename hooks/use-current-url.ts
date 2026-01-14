"use client"
import { useState, useEffect } from "react"

export function useCurrentUrl() {
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href)
    }
  }, [])

  return url
}
