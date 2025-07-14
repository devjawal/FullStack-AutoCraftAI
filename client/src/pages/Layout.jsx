// Updated Layout.jsx to support top navigation layout
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SignIn, useUser } from '@clerk/clerk-react'
import Topbar from '../components/Sidebar'

const Layout = () => {
  const { user } = useUser()

  return user ? (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white">
  <Topbar />
  <main className="flex-1 bg-neutral-900 overflow-y-auto">
    <Outlet />
  </main>
</div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-neutral-950">
      <SignIn />
    </div>
  )
}

export default Layout
