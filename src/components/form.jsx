import PropTypes from 'prop-types'

const Form = ({ action, children, method, name, onSubmit, ...otherProps }) => (
  <form
    name={name}
    method={method}
    action={action}
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    onSubmit={onSubmit}
    {...otherProps}>
    <input type="hidden" name="form-name" value={name} />
    {children}
  </form>
)

Form.propTypes = {
  action: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  method: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

Form.defaultProps = {
  method: 'post',
}

export default Form
