import styles from "./ResetPassword.module.css"
import { FaTools } from "react-icons/fa";
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <FaTools className={styles.icon} />

                <h1>Página em construção</h1>

                <p>
                    Estamos preparando essa funcionalidade para você.
                </p>

                <p className={styles.secondary}>
                    Esta funcionalidade ainda está em desenvolvimento. 
                    Enquanto ela não fica pronta, 
                    você pode utilizar outro endereço de e-mail para 
                    continuar cadastrando e acompanhando suas 
                    assinaturas normalmente.
                </p>

                <Link to="/" className={styles.button}>
                    Voltar ao Login
                </Link>
            </div>
        </main>
    )
}

export default ResetPassword