import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router'
import { BellIcon, BrainCircuit, HandCoinsIcon, HomeIcon, Settings, ShipWheelIcon, UsersIcon, MenuIcon, XIcon } from 'lucide-react'

const Sidebar = () => {
  const { authUser, isLoading } = useAuthUser()
  const location = useLocation()
  const currentPath = location.pathname
  const [open, setOpen] = useState(false)


  const sidebarContent = (
    <>
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider ">
            Vibely
          </span>
        </Link>
      </div>
      <nav className='flex-1 p-4 space-y-3 '>
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-3xl ${currentPath === "/" ? "btn-active" : ""}`}
          onClick={() => setOpen(false)}
        >
          <HomeIcon className="size-5 text-base-content opacity-70 " />
          <span>Home</span>
        </Link>
        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-3xl ${currentPath === "/friends" ? "btn-active" : ""}`}
          onClick={() => setOpen(false)}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>
        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-3xl ${currentPath === "/notifications" ? "btn-active" : ""}`}
          onClick={() => setOpen(false)}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
        <Link
          to="/payments"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-3xl ${currentPath === "/payments" ? "btn-active" : ""}`}
          onClick={() => setOpen(false)}
        >
          <HandCoinsIcon className="size-5 text-base-content opacity-70" />
          <span>Payments</span>
        </Link>
        <Link
          to="/ai"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-3xl ${currentPath === "/ai" ? "btn-active" : ""}`}
          onClick={() => setOpen(false)}
        >
          <BrainCircuit className="size-5 text-base-content opacity-70" />
          <span>Ai-Asist</span>
        </Link>
        <Link
          to="/settings"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case rounded-3xl ${currentPath === "/settings" ? "btn-active" : ""}`}
          onClick={() => setOpen(false)}
        >
          <Settings className="size-5 text-base-content opacity-70" />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-base-300 ">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
     
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-base-200 rounded-full p-2 shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <MenuIcon className="size-7" />
      </button>

      <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
        {sidebarContent}
      </aside>

      
      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden" onClick={() => setOpen(false)}>
          <aside
            className="w-64 bg-base-200 border-r border-base-300 flex flex-col h-full absolute left-0 top-0"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-50 bg-base-300 rounded-full p-2"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <XIcon className="size-7" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}

export default Sidebar