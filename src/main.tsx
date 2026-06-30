import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login.tsx'
import Register from './pages/register/Register.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import Unauthorized from './pages/unauthorized/Unauthorized.tsx'
import SettingsTelegram from './pages/settingsTelegram/SettingsTelegram.tsx'
import ResetPassword from './pages/resetPassword/ResetPassword.tsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    },
    {
      path: "dashboard",
      element: <Dashboard />
    },
    {
      path: "unauthorized",
      element: <Unauthorized />
    },
    {
      path: "settings",
      element: <SettingsTelegram />
    },
    {
      path: "resetPassword",
      element: <ResetPassword />
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
