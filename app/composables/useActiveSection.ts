import { onBeforeUnmount, onMounted, readonly, shallowRef } from 'vue'

const sectionIds = ['work', 'about', 'contact'] as const

export function useActiveSection() {
  const activeSection = shallowRef<(typeof sectionIds)[number]>('work')
  let frame = 0

  function updateActiveSection() {
    frame = 0
    const threshold = Math.min(window.innerHeight * 0.34, 280)
    let nextSection: (typeof sectionIds)[number] = 'work'

    for (const id of sectionIds) {
      const section = document.getElementById(id)
      if (section && section.getBoundingClientRect().top <= threshold) {
        nextSection = id
      }
    }

    activeSection.value = nextSection
  }

  function scheduleUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
  }

  onMounted(() => {
    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
    if (frame) window.cancelAnimationFrame(frame)
  })

  return { activeSection: readonly(activeSection) }
}
