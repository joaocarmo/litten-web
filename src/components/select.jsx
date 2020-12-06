import PropTypes from 'prop-types'

const Select = ({ options, placeholder, value, ...otherProps }) => (
  <select {...otherProps}>
    {!!placeholder && !value && <option value="">{placeholder}</option>}
    {options.map(({ key, label, value: optionValue }) => (
      <option key={key} value={optionValue}>
        {label}
      </option>
    ))}
  </select>
)

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}

Select.defaultProps = {
  placeholder: '',
  value: '',
}

export default Select
