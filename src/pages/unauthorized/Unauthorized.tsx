import styles from "./Unauthorized.module.css"
import { useNavigate } from "react-router-dom"
import { FiAlertTriangle } from "react-icons/fi"

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <FiAlertTriangle size={60} className={styles.icon} />

        <h1 className={styles.unauthorizedTitle}>403</h1>
        <h2 className={styles.unauthorizedSubtitle}>Acesso não autorizado</h2>

        <p className={styles.unauthorizedText}>
          Você não tem permissão para acessar esta página.
          Faça login novamente ou volte para a página inicial.
        </p>

        <div className={styles.actions}>
          <button onClick={() => navigate("/")} className={styles.btn}>
            Voltar ao login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized