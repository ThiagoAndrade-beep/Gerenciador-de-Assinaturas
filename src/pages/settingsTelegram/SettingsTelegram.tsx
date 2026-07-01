import { useEffect, useState } from 'react'
import styles from "./SettingsTelegram.module.css"
import AppHeader from '../../components/appHeader/AppHeader'
import type { DashboardUser } from '../../types/User'
import { getDashboard } from '../../services/GetDashboard.service'
import { useNavigate } from 'react-router-dom'

import { FaTelegramPlane } from "react-icons/fa";
import { connectTelegram } from '../../services/Connect.service'

const SettingsTelegram = () => {
  const [data, setData] = useState<DashboardUser | null>(null)
  const [code, setCode] = useState<string | undefined>("")
  const [showSuccessMessage, setShowSuccesMessage] = useState<boolean>(false)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          navigate("unauthorized")
          return
        }

        const response = await getDashboard(token)
        setData(response)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  async function connect() {
    if (!token) {
      navigate("/unauthorized")
      return
    }

    const response = await connectTelegram(token)
    setCode(response.code)
    setShowSuccesMessage(true)

    setTimeout(() => {
      setShowSuccesMessage(false)
    }, 15000)
    console.log(response)

    window.open(
      response.telegramUrl,
      "_blank"
    )
  }

  return (
    <div>
      <AppHeader user={data?.email} />
      <main className={styles.container}>
        <div className={styles.containerTitles}>
          <h2>Configurações</h2>
          <p>Se conecte com nosso bot para receber as notificações</p>
        </div>
        <div className={styles.telegramIntegration}>
          <div className={styles.telegramIntegrationContent}>
            <span className={styles.telegramIcon}><FaTelegramPlane /></span>
            <div className={styles.telegramIntegrationTexts}>
              <h4>Telegram</h4>
              <p>Receba alertas das suas assinaturas direto no Telegram.</p>

              <ol className={styles.telegramSteps}>
                <li>Clique no botão abaixo para abrir o bot no Telegram.</li>
                <li>Toque em <strong>Iniciar</strong> (ou envie <code>/start</code>).</li>
                <li>Pronto! Esta página vai atualizar automaticamente.</li>
              </ol>

              <div className={styles.telegramActions}>
                <button className={styles.telegramButton} onClick={connect}>
                  <FaTelegramPlane />
                  Conectar Telegram
                </button>
              </div>

              <p className={styles.linkCode}>
                Seu código de vínculo:
                <span>
                  {code ? code : "CODIGO_EXEMPLO"}
                </span>
              </p>
              {showSuccessMessage && (
                <div className={styles.successMessage}>
                  <span className={styles.successIcon}>✓</span>
                  <div>
                    <strong>Telegram conectado!</strong>
                    <p>Sua conta foi vinculada com sucesso e já está pronta para receber notificações.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsTelegram