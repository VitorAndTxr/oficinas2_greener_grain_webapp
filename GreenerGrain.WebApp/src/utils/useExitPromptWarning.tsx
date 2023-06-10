import { useEffect } from "react"

export const useExitPromptWarning = (alert: boolean) => {
  useEffect(() => {
    if (alert) {
      window.addEventListener('beforeunload', alertUser)
      return () => {
        window.removeEventListener('beforeunload', alertUser)
      }
    }

  }, [alert])

  const alertUser = (e: any) => {
    e.returnValue = ''
  }
}