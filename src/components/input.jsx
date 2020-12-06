import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Input = ({ id, name, placeholder, ...otherProps }) => {
  const labelRef = useRef(null)
  const inputEl = useRef(null)

  useEffect(() => {
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
        ref={inputEl}
        {...otherProps}
      />
    </label>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}

Input.defaultProps = {
  name: '',
  placeholder: '',
  value: '',
}

export default Input
