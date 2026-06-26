import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FavoritosProvider } from './context/FavoritosContext'
import { CatalogsProvider } from './context/CatalogsContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PromocionesPage from './pages/PromocionesPage'
import PromocionDetailPage from './pages/PromocionDetailPage'
import PerfilPage from './pages/PerfilPage'

export default function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}
