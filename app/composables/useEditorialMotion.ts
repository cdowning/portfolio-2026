import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'

export function useEditorialMotion() {
  const route = useRoute()
  let observer: IntersectionObserver | undefined
  let motionQuery: MediaQueryList | undefined

  function revealAll() {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
      element.dataset.revealed = 'true'
    })
  }

  function prepareMotion() {
    observer?.disconnect()
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reduced = motionQuery.matches
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'enhanced'

    if (reduced) {
      revealAll()
      return
    }

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
        element.dataset.revealed = 'true'
        observer?.unobserve(element)
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 })

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => observer?.observe(element))
  }

  function handleMotionPreference() {
    prepareMotion()
  }

  onMounted(() => {
    prepareMotion()
    motionQuery?.addEventListener('change', handleMotionPreference)
  })

  watch(() => route.fullPath, () => nextTick(prepareMotion))

  onBeforeUnmount(() => {
    observer?.disconnect()
    motionQuery?.removeEventListener('change', handleMotionPreference)
    delete document.documentElement.dataset.motion
  })
}
