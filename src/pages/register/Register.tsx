import React, { useState } from 'react'
import styles from "./Register.module.css"
import Header from '../../components/header/Header'
import Input from '../../components/input/Input'
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import Button from '../../components/button/Button';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/RegisterUser.service';
import { ToastContainer, toast } from 'react-toastify';
import type { RegisterRequest } from '../../types/User';

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user: RegisterRequest = {
            email,
            password
        }
        try {
            setLoading(true)
            const responseData = await registerUser(user)
            console.log(responseData)
            toast.success(responseData.msg)
        } catch (error) {
            toast.error("Erro ao tentar fazer login")
        } finally {
          setLoading(false)
        }
    }
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Criar conta</h2>
          <p>Cadastre-se para começar a organizar</p>
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <Input
              placeholder='seu@email.com'
              name='email'
              icon={FiMail} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </label>
          <label>
              <span>Senha</span>
            <Input
              placeholder='******'
              name='password'
              type='password'
              icon={FiLock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button type='submit'>
            {loading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
        <p>
          Já tem conta? <Link to="/">Faça login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login