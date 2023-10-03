import { useEffect, useRef } from 'react'
import type { ChangeEventHandler, FC } from 'react'

interface InputProps {
  id: string
  name?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  type: string
  value?: string
}

const Input: FC<InputProps> = ({
  id,
  name = '',
  placeholder = '',
  value = '',
  ...otherProps
}) => {
  const labelRef = useRef<HTMLSpanElement | null>(null)
  const inputEl = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!inputEl.current || !labelRef.current) {
      return
    }

    inputEl.current.placeholder = labelRef.current.innerText
  }, [])

  return (
    <label htmlFor={id}>
      <span ref={labelRef} hidden>
        {placeholder}
      </span>
      <input
        id={id}
        name={name || id}
        aria-label={placeholder || name}
        value={value}
        ref={inputEl}
        {...otherProps}
      />
    </label>
  )
}

export default Input
