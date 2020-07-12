// eslint-disable-next-line import/prefer-default-export
export const isIE11 = () => (
  typeof window !== 'undefined'
  && !!window.MSInputMethodContext
  && !!document.documentMode
)
