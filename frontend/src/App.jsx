import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { FavoritosProvider } from './context/FavoritosContext'
import { CatalogsProvider } from './context/CatalogsContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PromocionesPage from './pages/PromocionesPage'
import PromocionDetailPage from './pages/PromocionDetailPage'
import SupermercadosPage from './pages/SupermercadosPage'
import SupermercadoDetailPage from './pages/SupermercadoDetailPage'
import PerfilPage from './pages/PerfilPage'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Cargando...</p>
      </div>
    </div>
  )
}

function AppContent() {
  const { initialLoading } = useAuth()

  if (initialLoading) return <LoadingScreen />

  return (
    <FavoritosProvider>
    <CatalogsProvider>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<PromocionesPage />} />
            <Route path="/promociones/:id" element={<PromocionDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route
              path="/supermercados"
              element={
                <ProtectedRoute>
                  <SupermercadosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supermercados/:id"
              element={
                <ProtectedRoute>
                  <SupermercadoDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <PerfilPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </CatalogsProvider>
    </FavoritosProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
