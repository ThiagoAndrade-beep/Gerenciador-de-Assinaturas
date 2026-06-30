import React, { useState } from 'react'
import styles from "./Input.module.css"
import type { IconType } from 'react-icons'
import { FiEye, FiEyeOff } from 'react-icons/fi'

type inputProps = {
    icon?: IconType
    type?: React.InputHTMLAttributes<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({icon: Icon, type, ...props}: inputProps) => {    
    const [showPassword, setShowPassword] = useState<boolean>(false) 
    const isPassword = type === "password"
  return (
    <div className={styles.inputContainer}>
        {Icon && (
            <span className={styles.icon}>
                <Icon size={16}/>
            </span>
        )}
        <input {...props} className={styles.input} type={isPassword ? (showPassword ? "text" : "password"): type}/> 


        {isPassword && (
            <span className={styles.iconRight} onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
            </span>
        )}
    </div>
  )
}

export default Input