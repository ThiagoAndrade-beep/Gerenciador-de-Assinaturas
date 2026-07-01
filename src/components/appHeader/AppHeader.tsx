import styles from "./AppHeader.module.css"

import { HiOutlineCreditCard } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi"
import { FiUser } from "react-icons/fi"
import { Link, useNavigate } from 'react-router-dom';

type HeaderProps = {
    user: string | undefined
}

const AppHeader = ({ user }: HeaderProps) => {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("id")
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerTitle}>
                <HiOutlineCreditCard size={30} color='white' />
                <h2>SubTracker</h2>
            </div>
            <div className={styles.headerLinks}>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/settings">Telegram</Link>
            </div>
            <div className={styles.headerLogout}>
                <div className={styles.icon}>
                    <span className={styles.iconUser}><FiUser size={20} color='white' /></span>
                    <p className={styles.userText}>Olá, {user}</p>
                </div>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    <FiLogOut size={20} />
                </button>
            </div>
        </header>
    )
}

export default AppHeader