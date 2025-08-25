import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import OnboradPage from './pages/OnboradPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import  { Toaster } from 'react-hot-toast'

import PageLoader from './components/PageLoader.jsx'
import IntroAnimation from './components/Intro.jsx'

import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import {useThemeStore} from './store/useThemeStore'
import Friends from './pages/Friends.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import AiPage from './pages/AiPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

const App = () => {
  const { isLoading, authUser } = useAuthUser()
  const { theme } = useThemeStore()

  // Track if we've shown the intro animation in this session
  const [introShownThisSession, setIntroShownThisSession] = useState(false)
  
  // Check if this is the first visit ever
  const [showIntro, setShowIntro] = useState(() => {
    return !localStorage.getItem('hasVisitedBefore') && !introShownThisSession
  })

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false)
        setIntroShownThisSession(true)
        // Mark that user has visited before
        localStorage.setItem('hasVisitedBefore', 'true')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showIntro])

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  // Only show intro on first visit, never on refresh or navigation
  if (showIntro && !introShownThisSession) return <IntroAnimation />
  
  // Show loader only while authenticating, not on every page change
  if (isLoading && !authUser) return <PageLoader />

  return (
    <>
      <div className='h-screen' data-theme={theme}>
      
    
    <Routes>  
      <Route path='/' element={isAuthenticated && isOnboarded ?(
        <Layout showSidebar>
          <HomePage/>
        </Layout>
      ):(
        <Navigate to={!isAuthenticated ? "/login" : "/onboard"}/>
      )}/>
      <Route path='/signup' element={!isAuthenticated ? <SignupPage/>: <Navigate to={isOnboarded ? "/" : "/onboard"}/>}/>
      <Route path='/login' element={!isAuthenticated ?<LoginPage/> : <Navigate to={isOnboarded ? "/" : "/onboard"}/>}/>
      <Route path='/onboard' element={isAuthenticated ?( !isOnboarded ?(<OnboradPage/>):(<Navigate to="/"/>)) : ( <Navigate to="/login"/>)}/>
      <Route path='/notifications' element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
        <NotificationsPage/>
        </Layout> 
      ): (
        <Navigate to={!isAuthenticated ? "/login": "/onboard" }/>
      )}/>
      <Route path='/chat/:id' element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={false}>
        <ChatPage/>
        </Layout> 
      ): (
        <Navigate to={!isAuthenticated ? "/login": "/onboard" }/>
      )}/>
      <Route path='/call/:id' element={isAuthenticated && isOnboarded ? (
        <CallPage/>
      ): (
        <Navigate to={!isAuthenticated ? "/login": "/onboard" }/>
      )}/>
      <Route path='/friends' element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
          <Friends/>
        </Layout>
      ): (
        <Navigate to={!isAuthenticated ? "/login": "/onboard" }/>
      )}/>
      <Route path='/payments' element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
          <PaymentPage/>
        </Layout>
      ): (
        <Navigate to={!isAuthenticated ? "/login": "/onboard" }/>
      )}/>
      <Route path='/ai' element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
          <AiPage/>
        </Layout>
      ): (
        <Navigate to={!isAuthenticated ? "/login": "/onboard" }/>
      )}/>
      <Route path='/profile' element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
          <ProfilePage/>
        </Layout>
      ): (
        <Navigate to={!isAuthenticated ? "/login": "/onboard" }/>
      )}/>
      <Route path='/settings' element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
          <SettingsPage/>
        </Layout>
      ): (
        <Navigate to={!isAuthenticated ? "/login": "/onboard" }/>
      )}/>
      <Route path='/about' element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
          <AboutPage/>
        </Layout>
      ): (
        <Navigate to={!isAuthenticated ? "/login": "/onboard" }/>
      )}/>
    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App