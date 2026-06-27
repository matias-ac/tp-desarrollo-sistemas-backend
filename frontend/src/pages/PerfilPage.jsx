import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavoritos } from '../context/FavoritosContext'
import { useCatalogs } from '../context/CatalogsContext'
import { authService } from '../services/auth'
import { promocionesService } from '../services/promociones'
import { getBrandColor } from '../config/brandColors'
export default function PerfilPage() {
  const { user, accessToken, updateUser, logout } = useAuth()
  const { promosFav, supersFav } = useFavoritos()
  const { supermercados } = useCatalogs()
  const [loading, setLoading] = useState(true)
  const [promociones, setPromociones] = useState([])
  const [promosLoading, setPromosLoading] = useState(true)

  useEffect(() => {
    authService.getPerfil(accessToken)
      .then((perfil) => updateUser(perfil))
      .finally(() => setLoading(false))
  }, [accessToken, updateUser])

  useEffect(() => {
    promocionesService.getPromociones()
      .then((data) => setPromociones(data))
      .finally(() => setPromosLoading(false))
  }, [])

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
  const promocionesFavoritas = promociones.filter((p) => promosFav.has(p.id))

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

      {/* Promociones favoritas */}
      {promosLoading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      ) : promocionesFavoritas.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Mis promociones favoritas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {promocionesFavoritas.map((p) => {
              const color = getBrandColor(p.entidad_oferente?.nombre)
              const descuento = p.porcentaje_descuento
                ? `${parseFloat(p.porcentaje_descuento)}% OFF`
                : null
              return (
                <Link
                  key={p.id}
                  to={`/promociones/${p.id}`}
                  className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="px-4 pt-4 pb-6 relative" style={{ backgroundColor: color }}>
                    <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 bg-white" />
                    <div className="absolute -right-1 bottom-0 w-12 h-12 rounded-full opacity-10 bg-white" />
                    {descuento && (
                      <span className="inline-block bg-white font-bold text-lg px-2.5 py-0.5 rounded-lg" style={{ color }}>
                        {descuento}
                      </span>
                    )}
                  </div>
                  <div className="px-4 py-2.5">
                    {p.entidad_oferente?.nombre && (
                      <p className="text-xs font-medium text-gray-500">{p.entidad_oferente.nombre}</p>
                    )}
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{p.titulo}</h3>
                    <p className="text-xs text-gray-400 mt-1">{p.fecha_inicio} — {p.fecha_fin}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm text-center">
          <div className="text-4xl mb-2">❤️</div>
          <p className="text-sm text-gray-500">
            Todavia no tenes promociones favoritas.{' '}
            <Link to="/" className="text-brand-600 font-medium hover:underline">
              Explorar promociones
            </Link>
          </p>
        </div>
      )}

      {/* Supermercados favoritos */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-3">Mis supermercados favoritos</h2>
        {supermercadosFavoritos.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {supermercadosFavoritos.map((s) => {
              const color = getBrandColor(s.nombre)
              return (
                <Link
                  key={s.id}
                  to={`/supermercados/${s.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border hover:opacity-80 transition-opacity"
                  style={{
                    borderColor: `${color}40`,
                    backgroundColor: `${color}12`,
                    color,
                  }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  {s.nombre}
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-400">
              No tenes supermercados favoritos todavia.{' '}
              <Link to="/supermercados" className="text-brand-600 font-medium hover:underline">
                Agregar desde Supermercados
              </Link>
            </p>
          </div>
        )}
      </div>

    </main>
  )
}
