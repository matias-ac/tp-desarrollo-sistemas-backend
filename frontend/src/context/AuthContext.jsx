import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authService } from '../services/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [user, setUser] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const storedRefresh = localStorage.getItem('refreshToken')
    if (!storedRefresh) {
      setInitialLoading(false)
      return
    }

    authService.refreshToken(storedRefresh)
      .then((tokens) => {
        setAccessToken(tokens.access)
        const newRefresh = tokens.refresh || storedRefresh
        setRefreshToken(newRefresh)
        return authService.getPerfil(tokens.access)
      })
      .then((userData) => setUser(userData))
      .catch(() => {
        localStorage.removeItem('refreshToken')
      })
      .finally(() => setInitialLoading(false))
  }, [])

  const login = useCallback((tokens, userData) => {
    if (tokens.refresh) {
      localStorage.setItem('refreshToken', tokens.refresh)
    }
    setAccessToken(tokens.access)
    setRefreshToken(tokens.refresh)
    if (userData) setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('refreshToken')
    setAccessToken(null)
    setRefreshToken(null)
    setUser(null)
  }, [])

  const updateUser = useCallback((userData) => {
    setUser(userData)
  }, [])

  const updateTokens = useCallback((tokens) => {
    setAccessToken(tokens.access)
    if (tokens.refresh) {
      localStorage.setItem('refreshToken', tokens.refresh)
      setRefreshToken(tokens.refresh)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      accessToken,
      refreshToken,
      user,
      isAuthenticated: !!accessToken,
      initialLoading,
      login,
      logout,
      updateUser,
      updateTokens,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
