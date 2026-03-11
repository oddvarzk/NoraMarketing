import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * A minimal hook that creates a GSAP context scoped to a container ref,
 * runs the provided setup function, and cleans up on unmount.
 */
export function useGSAPContext<T extends HTMLElement>(
  setup: (ctx: gsap.Context) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const ctx = gsap.context(setup, ref)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
