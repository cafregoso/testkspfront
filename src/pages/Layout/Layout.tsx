import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'

export const Layout = ({ user, logout, token }: any) => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <Header user={user} logout={logout} token={token} />
        <Outlet />
        <Footer />
    </div>
  )
}