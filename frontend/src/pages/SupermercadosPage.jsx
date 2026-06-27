import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFavoritos } from '../context/FavoritosContext'
import { useCatalogs } from '../context/CatalogsContext'
import { promocionesService } from '../services/promociones'
import { getBrandColor } from '../config/brandColors'
import FavoritoButton from '../components/FavoritoButton'

export default function SupermercadosPage() {
  const { supersFav, toggleSuperFav } = useFavoritos()
  const { supermercados } = useCatalogs()
  const [promociones, setPromociones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    promocionesService.getPromociones()
      .then(setPromociones)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mb-6" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </main>
    )
  }

  const promosPorSuper = {}
  supermercados.forEach((s) => {
    promosPorSuper[s.id] = promociones.filter((p) =>
      p.supermercados?.includes(s.id)
    )
  })

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Supermercados</h1>

      {supermercados.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">🏪</div>
          <p className="font-semibold text-gray-600 text-lg">Sin supermercados</p>
          <p className="text-sm mt-1">No hay supermercados disponibles en este momento</p>
        </div>
      ) : (
        <div className="space-y-4">
          {supermercados.map((s) => {
            const color = getBrandColor(s.nombre)
            const promos = promosPorSuper[s.id] || []
            const esFav = supersFav.has(s.id)

            return (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
              >
                {/* Header del supermercado */}
                <div
                  className="px-5 py-4 flex items-center justify-between"
                  style={{ backgroundColor: `${color}10` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden">
                      <img
                        src={s.logo}
                        alt={s.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          const fallback = e.target.parentElement.querySelector('.img-fallback')
                          if (fallback) fallback.classList.remove('hidden')
                        }}
                      />
                      <div
                        className="img-fallback hidden w-full h-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: color }}
                      >
                        {s.nombre[0]}
                      </div>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">{s.nombre}</h2>
                      <p className="text-xs text-gray-500">
                        {promos.length} promocion{promos.length !== 1 ? 'es' : ''}
                      </p>
                    </div>
                  </div>
                  <FavoritoButton
                    activo={esFav}
                    onClick={() => toggleSuperFav(s.id)}
                    size={20}
                    className="p-2 rounded-full"
                  />
                </div>

                {/* Lista de promociones */}
                {promos.length > 0 && (
                  <div className="divide-y divide-gray-100">
                    {promos.map((p) => {
                      const descuento = p.porcentaje_descuento
                        ? `${parseFloat(p.porcentaje_descuento)}% OFF`
                        : null
                      return (
                        <Link
                          key={p.id}
                          to={`/promociones/${p.id}`}
                          className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {p.titulo}
                            </p>
                            {p.entidad_oferente?.nombre && (
                              <p className="text-xs text-gray-400 truncate">
                                {p.entidad_oferente.nombre}
                              </p>
                            )}
                          </div>
                          {descuento && (
                            <span
                              className="ml-3 text-sm font-bold flex-shrink-0"
                              style={{ color }}
                            >
                              {descuento}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}

                {promos.length === 0 && (
                  <div className="px-5 py-4 text-center text-sm text-gray-400">
                    No hay promociones disponibles para este supermercado
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
