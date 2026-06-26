import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, ChevronLeft, Calendar } from 'lucide-react'
import { promocionesService } from '../services/promociones'
import { useAuth } from '../context/AuthContext'
import { useFavoritos } from '../context/FavoritosContext'
import { useCatalogs } from '../context/CatalogsContext'
import { getBrandColor } from '../config/brandColors'
import FavoritoButton from '../components/FavoritoButton'
import LoadingSpinner from '../components/LoadingSpinner'

function Badge({ children, color = 'gray' }) {
  const colors = {
    green: 'bg-brand-100 text-brand-700',
    gray:  'bg-gray-100 text-gray-600',
    blue:  'bg-blue-100 text-blue-700',
  }
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  )
}

export default function PromocionDetailPage() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const { promosFav, togglePromoFav } = useFavoritos()
  const { supermercadosMap, diasSemanaMap, mediosPagoMap } = useCatalogs()
  const navigate = useNavigate()

  const [promocion, setPromocion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const favorita = promosFav.has(Number(id))

  useEffect(() => {
    setLoading(true)
    promocionesService.getPromocion(id)
      .then((promo) => setPromocion(promo))
      .catch((err) => setError(err.message || 'No se pudo cargar la promocion'))
      .finally(() => setLoading(false))
  }, [id])

  const handleFavorito = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    togglePromoFav(Number(id))
  }

  if (loading) return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <LoadingSpinner />
    </main>
  )

  if (error) return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
        {error}
      </div>
      <Link to="/" className="block text-center mt-4 text-brand-600 hover:underline text-sm">
        Volver al listado
      </Link>
    </main>
  )

  if (!promocion) return null

  const entidadNombre = promocion.entidad_oferente?.nombre
  const brandColor = getBrandColor(entidadNombre)

  const supermercadoNombres = promocion.supermercados
    ?.map((sid) => supermercadosMap[sid]?.nombre || `#${sid}`)
    .join(', ')

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-700 mb-4 transition-colors duration-200"
      >
        <ChevronLeft size={16} />
        Volver
      </Link>

      {/* Hero card */}
      <div
        className="rounded-2xl p-6 text-white mb-4 relative overflow-hidden"
        style={{ backgroundColor: brandColor }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -right-4 -bottom-12 w-40 h-40 bg-white/5 rounded-full" />
        <div className="relative">
          {entidadNombre && (
            <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 mb-3">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="text-xs font-semibold text-white">{entidadNombre}</span>
            </div>
          )}
          {promocion.porcentaje_descuento && (
            <div className="mb-3">
              <span
                className="inline-block bg-white font-bold text-2xl px-4 py-1 rounded-xl"
                style={{ color: brandColor }}
              >
                {parseFloat(promocion.porcentaje_descuento)}% OFF
              </span>
            </div>
          )}
          <h1 className="text-xl font-bold leading-snug">{promocion.titulo}</h1>
          {supermercadoNombres && (
            <p className="text-white/70 text-sm mt-1">{supermercadoNombres}</p>
          )}
        </div>
      </div>

      {/* Detalles */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 mb-4 shadow-sm">
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Descripcion
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{promocion.descripcion}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {promocion.tope_reintegro && (
            <Badge color="green">Tope $ {parseFloat(promocion.tope_reintegro).toLocaleString('es-AR')}</Badge>
          )}
          {promocion.cuotas_disponibles && (
            <Badge color="blue">{promocion.cuotas_disponibles} cuotas</Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} className="flex-shrink-0" />
          <span>Vigente del <strong>{promocion.fecha_inicio}</strong> al <strong>{promocion.fecha_fin}</strong></span>
        </div>

        {promocion.medios_de_pago?.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Medios de pago
            </h2>
            <div className="flex flex-wrap gap-2">
              {promocion.medios_de_pago.map((mid) => (
                <Badge key={mid} color="gray">
                  {mediosPagoMap[mid]?.descripcion || `Medio #${mid}`}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {promocion.dias_semana?.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Dias disponibles
            </h2>
            <div className="flex flex-wrap gap-2">
              {promocion.dias_semana.map((did) => (
                <Badge key={did} color="gray">
                  {diasSemanaMap[did]?.nombre || `Dia #${did}`}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Condiciones legales
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed whitespace-pre-line">
            {promocion.condiciones_legales}
          </p>
        </div>
      </div>

      {/* CTA favorito */}
      <button
        onClick={handleFavorito}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 ${
          favorita
            ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
            : 'bg-brand-600 text-white hover:bg-brand-700'
        }`}
      >
        <Heart
          size={18}
          className={`transition-all duration-200 ${favorita ? 'fill-red-500 text-red-500' : 'text-white'}`}
        />
        {favorita ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      </button>

      {!isAuthenticated && (
        <p className="text-center text-xs text-gray-400 mt-2">
          <Link to="/login" className="text-brand-600 hover:underline">Ingresa</Link> para guardar favoritos
        </p>
      )}
    </main>
  )
}
