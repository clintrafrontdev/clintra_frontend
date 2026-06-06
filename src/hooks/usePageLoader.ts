import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const LOADER_DURATION = 1200 // ms — GIF show hone ka time

export const usePageLoader = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(true) // app open hone par bhi dikhega

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), LOADER_DURATION)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return loading
}
