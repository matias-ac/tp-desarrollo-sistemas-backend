import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useFavoritos } from '../context/FavoritosContext'
import { useCatalogs } from '../context/CatalogsContext'
import { promocionesService } from '../services/promociones'
import { getBrandColor } from '../config/brandColors'
import FavoritoButton from '../components/FavoritoButton'
import LoadingSpinner from '../components/LoadingSpinner'

export default function SupermercadoDetailPage() {
  const { id } = useParams()
  const { supersFav, toggleSuperFav } = useFavoritos()
  const { supermercadosMap } = useCatalogs()
  const [promociones, setPromociones] = useState([])
  const [loading, setLoading] = useState(true)

  const supermercado = supermercadosMap[Number(id)]

  useEffect(() => {
    promocionesService.getPromociones()
      .then(setPromociones)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-8">
        <LoadingSpinner />
      </main>
    )
  }

  if (!supermercado) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
          Supermercado no encontrado
        </div>
        <Link to="/supermercados" className="block text-center mt-4 text-brand-600 hover:underline text-sm">
          Volver a supermercados
        </Link>
      </main>
    )
  }

  const color = getBrandColor(supermercado.nombre)
  const promos = promociones.filter((p) => p.supermercados?.includes(supermercado.id))
  const esFav = supersFav.has(supermercado.id)

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <Link
        to="/supermercados"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-700 mb-4 transition-colors"
      >
        <ChevronLeft size={16} />
        Volver
      </Link>

      {/* Hero */}
      <div
        className="rounded-2xl p-6 text-white mb-4 relative overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -right-4 -bottom-12 w-40 h-40 bg-white/5 rounded-full" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              {supermercado.nombre[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold">{supermercado.nombre}</h1>
              <p className="text-white/70 text-sm mt-0.5">
                {promos.length} promocion{promos.length !== 1 ? 'es' : ''} vigente{promos.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <FavoritoButton
            activo={esFav}
            onClick={() => toggleSuperFav(supermercado.id)}
            variant="onColor"
            size={22}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40"
          />
        </div>
      </div>

      {/* Promociones */}
      {promos.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
          <p className="text-sm text-gray-400">
            No hay promociones vigentes para este supermercado
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {promos.map((p) => {
            const descuento = p.porcentaje_descuento
              ? `${parseFloat(p.porcentaje_descuento)}% OFF`
              : null
            return (
              <Link
                key={p.id}
                to={`/promociones/${p.id}`}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {p.entidad_oferente?.nombre && (
                      <p className="text-xs font-medium text-gray-500">{p.entidad_oferente.nombre}</p>
                    )}
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug mt-0.5">{p.titulo}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{p.descripcion}</p>
                  </div>
                  {descuento && (
                    <span className="text-sm font-bold flex-shrink-0" style={{ color }}>
                      {descuento}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {p.fecha_inicio} — {p.fecha_fin}
                </p>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
