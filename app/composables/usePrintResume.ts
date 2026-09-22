export function usePrintResume() {
  function printResume() {
    if (import.meta.client) {
      window.print()
    }
  }

  return { printResume }
}
