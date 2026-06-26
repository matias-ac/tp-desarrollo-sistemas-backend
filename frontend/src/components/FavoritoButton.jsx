import { useState } from 'react'
import { Heart } from 'lucide-react'

/**
 * Botón de favorito unificado. Siempre usa un corazón (Heart).
 *
 * variant="default"  → outline gris / relleno rojo  (sobre fondo blanco)
 * variant="onColor"  → outline blanco / relleno blanco (sobre fondo de color de marca)
 */
export default function FavoritoButton({
  activo,
  onClick,
  variant = 'default',
  size = 18,
  className = '',
}) {
  const [animating, setAnimating] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAnimating(true)
    onClick?.()
  }

  const heartClass =
    variant === 'onColor'
      ? activo
        ? 'fill-white text-white'
        : 'text-white'
      : activo
        ? 'fill-red-500 text-red-500'
        : 'text-gray-300 hover:text-gray-400'

  return (
    <button
      type="button"
      onClick={handleClick}
      onAnimationEnd={() => setAnimating(false)}
      aria-label={activo ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      className={`flex items-center justify-center transition-all duration-200 ${
        animating ? 'animate-heartbeat' : ''
      } ${className}`}
    >
      <Heart size={size} className={`transition-all duration-200 ${heartClass}`} />
    </button>
  )
}
