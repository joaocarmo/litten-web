import { useEffect, useRef } from 'react'
import { getWindow } from '../config/utils'

const useEventListener = (eventName, handler, element = getWindow()) => {
  // Create a ref to store the handler
  const savedHandler = useRef(null)

  // Update ref.current value if handler changes
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener

      if (!isSupported) {
        return
      }

      // Create an event listener that calls the handler function stored in ref
      const eventListener = (event) => savedHandler.current(event)

      // Add the event listener
      element.addEventListener(eventName, eventListener)

      // Remove the event listener on cleanup
      // eslint-disable-next-line consistent-return
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    // Execute if eventName or element changes
    [eventName, element],
  )
}

export default useEventListener
