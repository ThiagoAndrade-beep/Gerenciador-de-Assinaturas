import React from 'react'
import styles from './InputField.module.css'

type InputFieldProps = {
    label: string
} & React.InputHTMLAttributes<HTMLInputElement>

const InputField = ({label, ...rest}: InputFieldProps) => {
  return (
    <label className={styles.label}>
        <span className={styles.span}>{label}</span>
        <input {...rest} className={styles.input}/>
    </label>
  )
}

export default InputField