import React from 'react'
import styles from "./Header.module.css"
import { HiOutlineCreditCard } from "react-icons/hi";

const Header = () => {
  return (
    <header className={styles.container}>
        <div className={styles.title}>
            <span className={styles.icon}><HiOutlineCreditCard size={32}/></span>
            <h1>SubTracker</h1>
        </div>
        <p>Gerencie todas as suas assinaturas em um lugar só</p>
    </header>
  )
}

export default Header