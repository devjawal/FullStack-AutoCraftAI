import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useClerk, useUser, Protect } from '@clerk/clerk-react'
import {
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { assets } from '../assets/assets'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
]

const Sidebar = () => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full bg-neutral-900 text-white border-b border-neutral-800 z-50 relative">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src={assets.autoCraft} alt="logo" className="w-28 sm:w-36" />
        </div>

        {/* User Controls */}
        <div className="flex items-center gap-4">
          {user && (
            <div onClick={openUserProfile} className="flex gap-3 items-center cursor-pointer group">
              <img src={user.imageUrl} alt="avatar" className="w-8 h-8 rounded-full border-2 border-[#00FFA3] group-hover:scale-105 transition-transform" />
              <div className="hidden sm:block text-sm leading-tight">
                <p className="font-medium text-white">{user.fullName}</p>
                <p className="text-xs text-[#00FFA3]">
                  <Protect plan="premium" fallback="Free">Premium</Protect> Plan
                </p>
              </div>
            </div>
          )}

          <LogOut
            onClick={signOut}
            className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
          />

          <button className="sm:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex gap-4 px-8 pb-2 text-sm font-medium">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/ai'}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold shadow'
                  : 'text-gray-300 hover:bg-neutral-800 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Nav */}
      {open && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-2 border-t border-neutral-800 bg-neutral-900">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold shadow'
                    : 'text-gray-300 hover:bg-neutral-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}

export default Sidebar
