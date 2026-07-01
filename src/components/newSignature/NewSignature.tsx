import React, { useState } from 'react'
import styles from "./NewSignature.module.css"
import InputField from './components/inputField/InputField'
import SelectField from './components/selectField/SelectField'
import { addSignature } from '../../services/AddSignature.service'
import type { CreateSignature } from '../../types/User'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'

type Props = {
  onClose: () => void
  onSignatureAdded: () => void
}

const NewSignature = ({onClose, onSignatureAdded}: Props) => {
  const [name, setName] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [dayAlert, setDayAlert] = useState<number | null>(null)
  const [msgError, setMsgError] = useState<string>('')
  const token = localStorage.getItem('token')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(dayAlert === null) {
      setMsgError("Selecione uma data de alerta")
      return
    }

    const signature: CreateSignature = {
      name,
      dueDate,
      dayAlert,
    }
    try {
      if (!token) {
        alert('Você não está autorizado')
        return
      }
      const response = await addSignature(signature, token)
      toast.success(response.msg)

      onSignatureAdded()
      onClose()
    } catch (error) {
      console.log(error)
      if(axios.isAxiosError(error)) {
        setMsgError(error.response?.data?.msg)
        console.log(error.response)
      }else {
        setMsgError('Erro interno')
      }
    }
  }

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Nova assinatura</h2>
        <InputField
          label='Nome do app/site'
          type='text'
          placeholder='Ex: Netflix, Spotify...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label='Data de validade'
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <SelectField
          label='Alerta antecipado'
          options={[
            { value: '1', label: '1 dia antes' },
            { value: '2', label: '2 dia antes' },
            { value: '3', label: '3 dia antes' },
            { value: '4', label: '4 dia antes' },
            { value: '7', label: '7 dia antes' },
            { value: '14', label: '14 dia antes' },
          ]}
          value={dayAlert}
          onChange={(e) => setDayAlert(Number(e.target.value))}
        />
        {msgError && (<p className={styles.msgError}>{msgError}</p>)}
        <div className={styles.actions}>
          <button className={styles.btnPrimary} type='button' onClick={onClose}>Cancelar</button>
          <button className={styles.btnSecondary} type='submit'>Adicionar</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default NewSignature