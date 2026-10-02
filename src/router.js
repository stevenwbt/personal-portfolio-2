import { useEffect, useState } from 'react'

/*
  A minimal path router — enough for a portfolio's handful of pages, without
  pulling in a routing library. Navigation is pushState plus a popstate event,
  so the back button works for free.
*/
export function navigate(to) {
  if (to === window.location.pathname) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}
