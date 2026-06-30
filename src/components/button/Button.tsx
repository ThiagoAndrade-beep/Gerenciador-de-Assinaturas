import React from 'react'
import styles from "./Button.module.css"

const Button = ({children, ...rest}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...rest} className={styles.button}>{children}</button>
  )
}

export default Button