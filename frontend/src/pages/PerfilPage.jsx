import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavoritos } from '../context/FavoritosContext'
import { useCatalogs } from '../context/CatalogsContext'
import { authService } from '../services/auth'
import { getBrandColor } from '../config/brandColors'
import FavoritoButton from '../components/FavoritoButton'

export default function PerfilPage() {
  const { user, accessToken, updateUser, logout } = useAuth()
  const { supersFav, toggleSuperFav } = useFavoritos()
  const { supermercados } = useCatalogs()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getPerfil(accessToken)
      .then((perfil) => updateUser(perfil))
      .finally(() => setLoading(false))
  }, [accessToken, updateUser])

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
          </div>
        ))}
      </main>
    )
  }

  const supermercadosFavoritos = supermercados.filter((s) => supersFav.has(s.id))

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>

      {/* Datos personales */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-2xl flex-shrink-0">
            {user?.first_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full text-sm font-medium text-gray-600 border border-gray-200 rounded-xl py-2 hover:bg-gray-50 transition-colors duration-200"
        >
          Cerrar sesion
        </button>
      </div>

      {/* Chips de supermercados favoritos */}
      {supermercadosFavoritos.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-3">Mis supermercados favoritos</h2>
          <div className="flex flex-wrap gap-2">
            {supermercadosFavoritos.map((s) => {
              const color = getBrandColor(s.nombre)
              return (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{
                    borderColor: `${color}40`,
                    backgroundColor: `${color}12`,
                    color,
                  }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  {s.nombre}
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Lista completa de supermercados */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-1">Mis supermercados</h2>
        <p className="text-xs text-gray-400 mb-4">
          Marca tus supermercados favoritos para filtrar promociones mas rapido.
        </p>

        {supermercados.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">🏪</div>
            <p className="text-sm">No hay supermercados disponibles</p>
          </div>
        ) : (
          <div className="space-y-1">
            {supermercados.map((s) => {
              const esFav = supersFav.has(s.id)
              const color = getBrandColor(s.nombre)
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between py-2.5 px-1 border-b border-gray-100 last:border-0 rounded-lg transition-colors hover:bg-gray-50 duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {s.nombre[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{s.nombre}</span>
                  </div>
                  <FavoritoButton
                    activo={esFav}
                    onClick={() => toggleSuperFav(s.id)}
                    size={20}
                    className="p-1.5 rounded-full"
                  />
                </div>
              )
            })}
          </div>
        )}

        {supermercados.length > 0 && supersFav.size === 0 && (
          <p className="text-center text-xs text-gray-400 mt-3">
            Todavia no tenes supermercados favoritos. ¡Marca los que usas mas seguido!
          </p>
        )}
      </div>

      {/* Acceso rapido */}
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 text-center">
        <p className="text-sm text-brand-700 font-medium mb-2">Explorar promociones</p>
        <Link
          to="/"
          className="inline-block bg-brand-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-brand-700 transition-colors duration-200"
        >
          Ver todas las promociones
        </Link>
      </div>
    </main>
  )
}
