import React from 'react'
import styles from './SelectField.module.css'

type Option = {
    value: string,
    label: string
}

type SelectFieldProps = {
    label: string,
    options: Option[]
} & React.SelectHTMLAttributes<HTMLSelectElement>

const SelectField = ({ label, options, ...rest }: SelectFieldProps) => {
    return (
        <label className={styles.label}>
            <span className={styles.span}>{label}</span>
            <select {...rest} className={styles.select}>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default SelectField