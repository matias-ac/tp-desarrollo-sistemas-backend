import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Token stored in memory only (not localStorage) to prevent XSS attacks
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [user, setUser] = useState(null)

  const login = useCallback((tokens, userData) => {
    setAccessToken(tokens.access)
    setRefreshToken(tokens.refresh)
    if (userData) setUser(userData)
  }, [])

  const logout = useCallback(() => {
    setAccessToken(null)
    setRefreshToken(null)
    setUser(null)
  }, [])

  const updateUser = useCallback((userData) => {
    setUser(userData)
  }, [])

  const updateTokens = useCallback((tokens) => {
    setAccessToken(tokens.access)
    if (tokens.refresh) setRefreshToken(tokens.refresh)
  }, [])

  return (
    <AuthContext.Provider value={{
      accessToken,
      refreshToken,
      user,
      isAuthenticated: !!accessToken,
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
