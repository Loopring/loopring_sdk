export const getWindowSafely = () => {
  if (typeof global.window === 'undefined' || typeof window === 'undefined') {
    return undefined
  } else {
    return window
  }
}

export const getNavigatorSafely = () => {
  if (typeof global.navigator === 'undefined' || typeof navigator === 'undefined') {
    return undefined
  } else {
    return navigator
  }
}