import type { FC, FormEventHandler, PropsWithChildren } from 'react'

interface FormProps {
  action: string
  className?: string
  method?: RequestInit['method']
  name: string
  onSubmit: FormEventHandler<HTMLFormElement>
}

const Form: FC<PropsWithChildren<FormProps>> = ({
  action,
  children,
  method = 'post',
  name,
  onSubmit,
  ...otherProps
}) => (
  <form
    name={name}
    method={method}
    action={action}
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    onSubmit={onSubmit}
    {...otherProps}
  >
    <input type="hidden" name="form-name" value={name} />
    {children}
  </form>
)

export default Form
