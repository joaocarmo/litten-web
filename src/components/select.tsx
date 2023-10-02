import type { ChangeEventHandler, FC } from 'react'

interface SelectOption {
  key: string
  label: string
  value: string
}

interface SelectProps {
  id?: string
  name?: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  options: SelectOption[]
  placeholder?: string
  value?: string
}

const Select: FC<SelectProps> = ({
  options,
  placeholder = '',
  value = '',
  ...otherProps
}) => (
  <select {...otherProps}>
    {!!placeholder && !value && <option value="">{placeholder}</option>}
    {options.map(({ key, label, value: optionValue }) => (
      <option key={key} value={optionValue}>
        {label}
      </option>
    ))}
  </select>
)

export default Select
