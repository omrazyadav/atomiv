'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('atomiv_admin_auth')
      const storedPassword = localStorage.getItem('atomiv_admin_password')
      
      if (isAuthenticated === 'true' && storedPassword) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
        // Redirect to admin login if not authenticated
        router.push('/admin')
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const logout = () => {
    localStorage.removeItem('atomiv_admin_auth')
    localStorage.removeItem('atomiv_admin_password')
    setAuthenticated(false)
    router.push('/admin')
  }

  const getStoredPassword = () => {
    return localStorage.getItem('atomiv_admin_password') || ''
  }

  return {
    authenticated,
    loading,
    logout,
    getStoredPassword
  }
} 