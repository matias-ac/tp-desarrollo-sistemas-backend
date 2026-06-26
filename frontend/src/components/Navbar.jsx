import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span className="font-bold text-brand-700 text-lg leading-none">
            AhorraMax
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors"
          >
            Promociones
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/perfil"
                className="text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors hidden sm:inline"
              >
                {user?.first_name || user?.email || 'Mi perfil'}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors"
              >
                Ingresar
              </Link>
              <Link
                to="/registro"
                className="text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
