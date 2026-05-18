import './Badge.css'

export const Badge = ({ variant = 'primary', children }) => {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  )
}
