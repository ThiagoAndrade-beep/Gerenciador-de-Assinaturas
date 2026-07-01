import { useEffect, useState } from 'react'
import styles from "./Dashboard.module.css"
import { useNavigate } from 'react-router-dom'
import { getDashboard } from '../../services/GetDashboard.service'
import type { DashboardUser, Signatures } from '../../types/User'
import NewSignature from '../../components/newSignature/NewSignature'
import { viewSignature } from '../../services/ViewSignature.service'
import { FiCalendar } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { deleteSignature } from '../../services/DeleteSignature.service'
import AppHeader from '../../components/appHeader/AppHeader'

const Dashboard = () => {
  const [data, setData] = useState<DashboardUser | null>(null)
  const [addSignature, setAddSignature] = useState<boolean>(false)
  const [signatures, setSignatures] = useState<Signatures[] | null>(null)
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

  const fetchSignature = async () => {
    try {
      if (!token) {
        navigate("unauthorized")
        return
      }
      const response = await viewSignature(token)
      console.log("viewSignature", response)
      setSignatures(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSignature()
  }, [])

  function handleSignature() {
    setAddSignature((prev) => !prev)
  }

  async function handleDelete(idSignature: string) {
    try {
      if (!token) {
        navigate("unauthorized")
        return
      }
      if (!idSignature) {
        console.log("id nao encontrado", idSignature)
        return
      }
      const response = await deleteSignature(token, idSignature)
      console.log("teste", idSignature)
      console.log(response)

      setSignatures((prev) => {
        if (!prev) {
          return []
        }
        return prev.filter((signature) => signature._id !== idSignature) //ID DESSA TIPAGEM ESTÁ COMO OPCIONAL, PODENDO RETORNAR UNDEFINED
      })
    } catch (error) {
      console.log('erro ao tentar apagar assinatura', error)
    }
  }

  return (
    <div>
      <AppHeader user={data?.email} />
      <main className={styles.container}>
        <section className={styles.sectiorHeader}>
          <div className={styles.headerTexts}>
            <h2>Minhas Assinaturas</h2>
            <p>{data?.signatures.length} assinaturas cadastradas</p>
          </div>
          <button className={styles.btn} onClick={handleSignature}>+ Nova assinatura</button>
        </section>

        {addSignature && (<NewSignature onClose={() => setAddSignature(false)} onSignatureAdded={fetchSignature} />)}
        <section className={styles.signatures}>
          {signatures ? (
            signatures.map((item) => (
              <div key={item._id} className={styles.signaturesContainer}>
                <div className={styles.ladoEsquerdo}>
                  <h3>{item.name}</h3>
                  <div className={styles.infos}>
                    <div className={styles.validateInfo}>
                      <FiCalendar />
                      <p>Validade: {new Date(item.dueDate).toLocaleDateString("pt-BR", {timeZone: "UTC"})}</p>
                    </div>
                    <div className={styles.alertInfo}>
                      <FaRegBell />
                      <p>Alerta: {item.dayAlert} dias antes</p>
                    </div>
                  </div>
                </div>
                <div className={styles.ladoDireito}>
                  <span className={styles.action}><FiEdit /></span>
                  <span className={styles.action} onClick={() => handleDelete(item._id)}><FiTrash2 /></span>
                </div>
              </div>
            ))
          ) : (<p>Não tem</p>)}
        </section>
      </main>
    </div>
  )
}

export default Dashboard