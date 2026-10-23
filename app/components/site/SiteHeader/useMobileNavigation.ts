import { nextTick, onBeforeUnmount, onMounted, readonly, shallowRef, watch } from 'vue'

export function useMobileNavigation() {
  const isOpen = shallowRef(false)
  const trigger = shallowRef<HTMLButtonElement | null>(null)

  function open() {
    isOpen.value = true
  }

  function close(options: { restoreFocus?: boolean } = {}) {
    const wasOpen = isOpen.value
    isOpen.value = false
    if (wasOpen && options.restoreFocus) nextTick(() => trigger.value?.focus())
  }

  function toggle() {
    if (isOpen.value) close()
    else open()
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen.value) close({ restoreFocus: true })
  }

  watch(isOpen, (openState) => {
    document.body.classList.toggle('navigation-open', openState)
  })

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.classList.remove('navigation-open')
  })

  return {
    close,
    isOpen: readonly(isOpen),
    toggle,
    trigger,
  }
}
