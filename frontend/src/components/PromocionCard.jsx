import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavoritos } from '../context/FavoritosContext'
import { useCatalogs } from '../context/CatalogsContext'
import { getBrandColor } from '../config/brandColors'
import FavoritoButton from './FavoritoButton'

export default function PromocionCard({ promocion }) {
  const { isAuthenticated } = useAuth()
  const { promosFav, togglePromoFav } = useFavoritos()
  const { supermercadosMap } = useCatalogs()

  const favorita = promosFav.has(promocion.id)

  const descuento = promocion.porcentaje_descuento
    ? `${parseFloat(promocion.porcentaje_descuento)}% OFF`
    : null

  const entidadNombre = promocion.entidad_oferente?.nombre
  const brandColor = getBrandColor(entidadNombre)

  const supermercadoNombres = promocion.supermercados
    ?.map((id) => supermercadosMap[id]?.nombre || `#${id}`)
    .join(', ')

  return (
    <Link
      to={`/promociones/${promocion.id}`}
      className="block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Cabecera con color de marca */}
      <div
        className="px-4 pt-4 pb-6 relative"
        style={{ backgroundColor: brandColor }}
      >
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 bg-white" />
        <div className="absolute -right-1 bottom-0 w-12 h-12 rounded-full opacity-10 bg-white" />

        {descuento && (
          <span
            className="inline-block bg-white font-bold text-xl px-3 py-0.5 rounded-lg"
            style={{ color: brandColor }}
          >
            {descuento}
          </span>
        )}

        {isAuthenticated && (
          <FavoritoButton
            activo={favorita}
            onClick={() => togglePromoFav(promocion.id)}
            variant="onColor"
            size={18}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40"
          />
        )}
      </div>

      {/* Cuerpo */}
      <div className="px-4 py-3 -mt-3 relative">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
          {entidadNombre && (
            <div className="flex items-center gap-1.5 mb-2">
              <span
                className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: brandColor }}
              />
              <span className="text-xs font-medium text-gray-500">{entidadNombre}</span>
            </div>
          )}
          <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2">
            {promocion.titulo}
          </h3>
          {supermercadoNombres && (
            <p className="text-xs text-gray-400 mt-1">{supermercadoNombres}</p>
          )}
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {promocion.descripcion}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span>
            {promocion.fecha_inicio} — {promocion.fecha_fin}
          </span>
          {promocion.cuotas_disponibles && (
            <span className="bg-brand-50 text-brand-700 font-medium px-2 py-0.5 rounded-full">
              {promocion.cuotas_disponibles} cuotas
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
