import React, { useState } from 'react'
import styles from "./Login.module.css"
import Header from '../../components/header/Header'
import Input from '../../components/input/Input'
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import Button from '../../components/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/LoginUser.service';
import type { LoginRequest } from '../../types/User';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const user: LoginRequest = {
        email,
        password
      }
      try {
        setLoading(true)
        const responseData = await loginUser(user)
        const token = responseData.token
        const idUser = responseData.userId
        localStorage.setItem("token",token)
        localStorage.setItem("id", idUser)
        navigate("settings")
      } catch (error) {
        toast.error("Erro ao tentar realizar o login")
      }finally {
        setLoading(false)
      }
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Bem-vindo de volta</h2>
          <p>Entre pra gerenciar suas assinaturas</p>
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
            <div className={styles.labelPassword}>
              <span>Senha</span>
              <Link to="resetPassword">Esqueceu a senha?</Link>
            </div>
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
              {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <p>
          Não tem conta? <Link to="register">Cadastre-se</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login