import { nextTick, onBeforeUnmount, onMounted, type ShallowRef } from 'vue'

const DESKTOP_QUERY = '(min-width: 64.001rem) and (min-height: 42rem)'

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function useHeroScrollMotion(hero: Readonly<ShallowRef<HTMLElement | null>>) {
  let animationFrame = 0
  let desktopQuery: MediaQueryList | undefined
  let motionQuery: MediaQueryList | undefined
  let resizeObserver: ResizeObserver | undefined
  let usesNativeTimeline = false
  let heroTop = 0
  let travel = 1

  function setProgress(progress: number) {
    const element = hero.value
    if (!element) return

    const normalized = clamp(progress)
    element.style.setProperty('--hero-progress', normalized.toFixed(4))
  }

  function update() {
    animationFrame = 0
    const element = hero.value
    if (!element || usesNativeTimeline || element.dataset.heroMotion !== 'scroll') return
    setProgress((window.scrollY - heroTop) / travel)
  }

  function scheduleUpdate() {
    if (animationFrame) return
    animationFrame = window.requestAnimationFrame(update)
  }

  function measure() {
    const element = hero.value
    if (!element || !motionQuery || !desktopQuery) return

    if (motionQuery.matches) {
      element.dataset.heroMotion = 'reduced'
      delete element.dataset.heroDriver
      setProgress(1)
      return
    }

    if (!desktopQuery.matches) {
      element.dataset.heroMotion = 'compact'
      delete element.dataset.heroDriver
      setProgress(1)
      return
    }

    element.dataset.heroMotion = 'scroll'
    element.dataset.heroDriver = usesNativeTimeline ? 'native' : 'fallback'

    if (usesNativeTimeline) {
      element.style.removeProperty('--hero-progress')
      return
    }

    const stage = element.querySelector<HTMLElement>('.hero__stage')
    heroTop = element.getBoundingClientRect().top + window.scrollY
    travel = Math.max(1, element.scrollHeight - (stage?.clientHeight ?? window.innerHeight))
    scheduleUpdate()
  }

  function handlePreferenceChange() {
    measure()
  }

  onMounted(async () => {
    await nextTick()
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    desktopQuery = window.matchMedia(DESKTOP_QUERY)
    usesNativeTimeline = CSS.supports('animation-timeline: view()')
    motionQuery.addEventListener('change', handlePreferenceChange)
    desktopQuery.addEventListener('change', handlePreferenceChange)
    if (!usesNativeTimeline) window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', measure)

    if (hero.value) {
      resizeObserver = new ResizeObserver(measure)
      resizeObserver.observe(hero.value)
    }

    measure()
    document.fonts?.ready.then(measure)
  })

  onBeforeUnmount(() => {
    if (animationFrame) window.cancelAnimationFrame(animationFrame)
    resizeObserver?.disconnect()
    motionQuery?.removeEventListener('change', handlePreferenceChange)
    desktopQuery?.removeEventListener('change', handlePreferenceChange)
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', measure)
  })
}
